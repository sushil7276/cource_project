import express from "express";
import {
  changePassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  updateProfile,
  updateProfilePic,
} from "../controllers/userController.js";
import { isAuthentication } from "../middlewares/Auth.js";

const router = express.Router();

// Get All Users
router.route("/users").get(getAllUsers);

// Register
router.route("/register").post(register);

// Login and Logout
router.route("/login").post(login);
router.route("/logout").get(logout);

// Get My Profile
router.route("/me").get(isAuthentication, getMyProfile);

// Change Password
router.route("/changepassword").put(isAuthentication, changePassword);

// Update Profile
router.route("/updateprofile").put(isAuthentication, updateProfile);

// Update Profile Picture
router.route("/updateprofilepicture").put(isAuthentication, updateProfilePic);

export default router;
