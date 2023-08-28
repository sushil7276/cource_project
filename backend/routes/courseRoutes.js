import express from "express";
import {
  addLecture,
  createCourse,
  deleteCourse,
  getAllCourse,
  getCourseLectures,
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, isAuthentication } from "../middlewares/Auth.js";

const router = express.Router();

// Get all course without lectures
router.route("/courses").get(getAllCourse);

// Create new course - only admin can access this
router
  .route("/createcourse")
  .post(isAuthentication, authorizeAdmin, singleUpload, createCourse);

// Add lecture, Delete Course, Get Course Details
router
  .route("/course/:id")
  .get(isAuthentication, getCourseLectures)
  .post(isAuthentication, authorizeAdmin, singleUpload, addLecture)
  .delete(isAuthentication, authorizeAdmin, deleteCourse);

export default router;
