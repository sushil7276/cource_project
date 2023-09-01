import express from "express";
import {
  contact,
  courseRequest,
  getDashboardStats,
} from "../controllers/othersController.js";

const router = express.Router();

// Contact form
router.route("/contact").post(contact);

// Course Request
router.route("/course-request").post(courseRequest);

// Get Admin Dashboard Stats
router.route("/admin-stats").get(getDashboardStats);

export default router;
