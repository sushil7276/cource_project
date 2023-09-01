import express from "express";
import {
  addLecture,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllCourse,
  getCourseLectures,
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import {
  authorizeAdmin,
  authorizeSubscriber,
  isAuthentication,
} from "../middlewares/Auth.js";

const router = express.Router();

// Get all course without lectures
router.route("/courses").get(getAllCourse);

// Create new course - only admin can access this
router
  .route("/createcourse")
  .post(isAuthentication, authorizeAdmin, singleUpload, createCourse);

// Add lecture, Delete Course, Get all Lecture in the Course
router
  .route("/course/:id")
  .get(isAuthentication, authorizeSubscriber, getCourseLectures)
  .post(isAuthentication, authorizeAdmin, singleUpload, addLecture)
  .delete(isAuthentication, authorizeAdmin, deleteCourse);

// Delete Lecture
router
  .route("/lecture")
  .delete(isAuthentication, authorizeAdmin, deleteLecture);

export default router;
