import { CatchAsyncError } from "../middlewares/CatchAsyncError.js";
import { sendEmail } from "../utils/sendEmail.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Stats } from "../models/Stats.js";

export const contact = CatchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new ErrorHandler("Please provide all the required fields"));
  }

  const to = process.env.MY_MAIL;
  const subject = "Contact from CourseBundler";
  const text = `I am ${name}.\nMy email is ${email}.\n${message}.`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Email sent successfully",
  });
});

export const courseRequest = CatchAsyncError(async (req, res, next) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return next(new ErrorHandler("Please provide all the required fields"));
  }

  const to = process.env.MY_MAIL;
  const subject = "Request for Course on CourseBundler";
  const text = `I am ${name}.\nMy email is ${email}.\n${course}.`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your Request has been sent successfully",
  });
});

export const getDashboardStats = CatchAsyncError(async (req, res, next) => {});
