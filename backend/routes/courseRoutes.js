import express from "express";
import {
  addLecture,
  createCourse,
  getAllCourse,
  getCourseLectures,
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// Get all course without lectures
router.route("/courses").get(getAllCourse);

// Create new course - only admin can access this
router.route("/createcourse").post(singleUpload, createCourse);

// Add lecture, Delete Course, Get Course Details
router
  .route("/course/:id")
  .get(getCourseLectures)
  .post(singleUpload, addLecture);

export default router;
