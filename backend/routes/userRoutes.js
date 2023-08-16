import express from "express";
import { getAllUsers, register } from "../controllers/userController.js";

const router = express.Router();

router.route("/users").get(getAllUsers);
router.route("/register").post(register);

export default router;
