import express from "express";
import {
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { isAuthentication } from "../middlewares/Auth.js";

const router = express.Router();

router.route("/users").get(getAllUsers);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/me").get(isAuthentication, getMyProfile);

export default router;
