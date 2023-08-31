import jwt from "jsonwebtoken";
import { CatchAsyncError } from "./CatchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";

export const isAuthentication = CatchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Not Logged In", 401));

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decode._id);

  next();
});

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resource`,
        403
      )
    );
  next();
};

export const authorizeSubscriber = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.subscription.status !== "active") {
    return next(
      new ErrorHandler(`Only subscriber can access this resource`, 403)
    );
  }

  next();
};
