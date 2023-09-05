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

export const getDashboardStats = CatchAsyncError(async (req, res, next) => {
  const stats = await Stats.find().sort({ createdAt: "desc" }).limit(12);

  const statsData = [];
  for (let i = 0; i < stats.length; i++) {
    statsData.push(stats[i]);
  }

  const requiredSize = 12 - stats.length;
  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      users: 0,
      subscription: 0,
      views: 0,
    });
  }

  const usersCount = statsData[11].users;
  const subscriptionCount = statsData[11].subscription;
  const viewsCount = statsData[11].views;

  let userProfit = true,
    viewsProfit = true,
    subscriptionProfit = true;

  let userPercentage = 0,
    viewsPercentage = 0,
    subscriptionPercentage = 0;

  if (statsData[10].users === 0) userPercentage = usersCount * 100;
  if (statsData[10].views === 0) userPercentage = viewsCount * 100;
  if (statsData[10].subscription === 0)
    userPercentage = subscriptionCount * 100;
  else {
    const difference = {
      users: statsData[11].users - statsData[10].users,
      views: statsData[11].views - statsData[10].views,
      subscription: statsData[11].subscription - statsData[10].subscription,
    };
    userPercentage = (difference.users / statsData[10].users) * 100;
    viewsPercentage = (difference.views / statsData[10].views) * 100;
    subscriptionPercentage =
      (difference.subscription / statsData[10].subscription) * 100;

    if (userPercentage < 0) userProfit = false;
    if (viewsPercentage < 0) viewsProfit = false;
    if (subscriptionPercentage < 0) subscriptionProfit = false;
  }

  res.status(200).json({
    success: true,
    stats: statsData,
    usersCount,
    subscriptionCount,
    viewsCount,
    subscriptionPercentage,
    viewsPercentage,
    userPercentage,
    userProfit,
    viewsProfit,
    subscriptionProfit,
  });
});
