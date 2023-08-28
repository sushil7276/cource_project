import express from "express";
import {
  addLecture,
  createCourse,
  getAllCourse,
  getCourseLectures,
} from "../controllers/courseController.js";

const router = express.Router();

// Get all course without lectures
router.route("/courses").get(getAllCourse);

// Create new course - only admin can access this
router.route("/createcourse").post(createCourse);

// Add lecture, Delete Course, Get Course Details
router.route("/course/:id").get(getCourseLectures).post(addLecture);

export default router;
