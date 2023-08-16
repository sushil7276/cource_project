import { CatchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";

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
