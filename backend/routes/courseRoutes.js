import express from "express";
import { createCourse, getAllCourse } from "../controllers/courseController.js";

const router = express.Router();

// Get all course without lectures
router.route("/courses").get(getAllCourse);

// Create new course - only admin can access this
router.route("/createcourse").post(createCourse);

// Add lecture, Delete Course, Get Course Details
router.route("/create/:id").get();

export default router;
