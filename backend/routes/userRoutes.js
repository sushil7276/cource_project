import express from "express";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.route("/users").get(getAllUsers);
router.route("/register").post();

export default router;
