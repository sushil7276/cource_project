import { Course } from "../models/Course.js";
import { CatchAsyncError } from "../middlewares/CatchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getAllCourse = CatchAsyncError(async (req, res, next) => {
  const course = await Course.find().select("-lectures");

  res.status(200).json({
    success: true,
    message: course,
  });
});

export const createCourse = CatchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy) {
    return next(new ErrorHandler("Please add all fields", 400));
  }

  // const file = req.file;

  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: "temp",
      url: "temp",
    },
  });

  res.status(201).json({
    success: true,
    message: "Create Courses",
  });
});
