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

// Get All Lectures
export const getCourseLectures = CatchAsyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  course.views += 1;
  await course.save();

  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});

// Add Lectures
export const addLecture = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  // const file = req.file;

  const course = await Course.findById(id);
  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  // Upload file here

  course.lectures.push({
    title,
    description,
    video: {
      public_id: "temp_id",
      url: "url",
    },
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture Added",
  });
});
