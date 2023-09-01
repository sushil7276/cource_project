import { CatchAsyncError } from "../middlewares/CatchAsyncError.js";
import { sendEmail } from "../utils/sendEmail.js";

export const contact = CatchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  const to = process.env.MY_MAIL;
  const subject = "Contact from CourseBundler";
  const text = `I am ${name}.\n My email is ${email}.\n My message is ${message}.`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Email sent successfully",
  });
});

export const courseRequest = CatchAsyncError(async (req, res, next) => {});

export const getDashboardStats = CatchAsyncError(async (req, res, next) => {});
