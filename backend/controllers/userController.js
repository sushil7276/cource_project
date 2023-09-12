import { CatchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import { Course } from "../models/Course.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import { Stats } from "../models/Stats.js";

export const getAllUsers = CatchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

export const register = CatchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const file = req.file;
  if (!name || !email || !password || !file) {
    return next(new ErrorHandler("Please enter all field", 400));
  }

  let user = await User.findOne({ email });
  if (user) return next(new ErrorHandler("User already Exist", 409));

  const fileUri = await getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    folder: "course_avatars",
  });

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(res, user, "Registered Successfully", 201);
});

export const login = CatchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter all field", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("User doesn't Exist", 401));

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email or Password", 401));

  sendToken(res, user, `Welcome Back ${user.name}`, 201);
});

// Logout
export const logout = CatchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logout successfully",
    });
});

// User Profile
export const getMyProfile = CatchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Change password
export const changePassword = CatchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(new ErrorHandler("Please enter all field", 400));
  }

  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) return next(new ErrorHandler("Incorrect Old Password", 401));

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

// Forget Password
export const forgetPassword = CatchAsyncError(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler("User not found", 400));

  const resetToken = await user.getResetToken();

  await user.save();

  const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  const message = `Click on the link to reset your password. ${url}. If you have not request then please ignore.`;

  // Send token via email
  await sendEmail(user.email, "CourseBundler Reset Password", message);

  res.status(200).json({
    success: true,
    message: `Reset Token has been sent to ${user.email}`,
  });
});

// Reset Password
export const resetPassword = CatchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });

  if (!user)
    return next(
      new ErrorHandler("Reset Token is invalid or has been expired", 400)
    );

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
});

// Update Profile
export const updateProfile = CatchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id);
  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
  });
});

// Update Profile Picture
export const updateProfilePic = CatchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const file = req.file;
  const fileUri = await getDataUri(file);
  if (!file) {
    return next(new ErrorHandler("Please upload a file", 400));
  }
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    folder: "course_avatars",
  });

  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile picture updated successfully",
  });
});

// Update User Role --- Only Admin
export const updateUserRole = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("User not found", 404));

  if (user.role === "user") {
    user.role = "admin";
  } else {
    user.role = "user";
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "User role updated successfully",
  });
});

// Add to playList
export const addToPlayList = CatchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.body.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  // If course is already in the playlist
  const itemExist = user.playlist.find((item) => {
    if (item.course.toString() === course._id.toString()) return true;
  });
  if (itemExist) {
    return next(new ErrorHandler("Course already in playlist", 409));
  }

  // If course is not in the playlist then add it
  user.playlist.push({
    course: course._id,
    poster: course.poster.url,
  });

  await user.save();

  res.status(201).json({
    success: true,
    message: "Added to playlist successfully",
  });
});

// delete from playLis
export const deleteFromPlayList = CatchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const course = await Course.findById(req.query.id);

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  const newPlaylist = user.playlist.filter((item) => {
    if (item.course.toString() !== course._id.toString()) return item;
  });

  user.playlist = newPlaylist;

  await user.save();

  res.status(201).json({
    success: true,
    message: "Removed from playlist successfully",
  });
});

// Delete User --- Only Admin
export const deleteUser = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("User not found", 404));

  if (user.role === "admin") {
    return next(new ErrorHandler("You cannot delete this user", 403));
  }

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  // Cancel subscription of all courses

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

// Delete My Profile
export const deleteMyProfile = CatchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) return next(new ErrorHandler("User not found", 404));

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  // Cancel subscription of all courses

  await user.remove();

  res
    .status(200)
    .cookie("token", null, { expires: new Date(Date.now()) })
    .json({
      success: true,
      message: "User deleted successfully",
    });
});

// This function using in deployment
// If any changes in this database then this method call
// User.watch().on("change", async () => {
//   const stats = await Stats.find().sort({ createdAt: "desc" }).limit(1);

//   const subscription = await User.find({ "subscription.status": "active" });

//   stats[0].users = await User.countDocuments();
//   stats[0].subscription = subscription.length;
//   stats[0].createdAt = new Date(Date.now());

//   await stats[0].save();
// });
