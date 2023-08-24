import { CatchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";

export const getAllUsers = (req, res, next) => {
  console.log("All Users");
  res.status(200).json({
    success: true,
    message: "All Users",
  });
};

export const register = CatchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  // const file = req.file;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all field", 400));
  }

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User already Exist", 409));

  // upload file on cloudinary

  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "temp_id",
      url: "temp_url",
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
    .cookie("token", null, { expires: new Date(Date.now()) })
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
  const user = await User.findById(req.user._id);
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
  // cloudinary upload

  const user = await User.findById(req.user._id);
});
