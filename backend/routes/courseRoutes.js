import express from "express";
import { createCourse, getAllCourse } from "../controllers/courseController.js";

const router = express.Router();

router.route("/courses").get(getAllCourse);
router.route("/createcourse").post(createCourse);

export default router;
