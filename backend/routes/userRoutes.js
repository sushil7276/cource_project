import express from "express";
import {
  addToPlayList,
  changePassword,
  deleteFromPlayList,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  resetPassword,
  updateProfile,
  updateProfilePic,
} from "../controllers/userController.js";
import { isAuthentication } from "../middlewares/Auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// Get All Users
router.route("/users").get(getAllUsers);

// Register
router.route("/register").post(singleUpload, register);

// Login and Logout
router.route("/login").post(login);
router.route("/logout").get(logout);

// Forget Password
router.route("/forgetpassword").post(forgetPassword);

// Reset Password
router.route("/resetpassword/:token").put(resetPassword);

// Get My Profile
router.route("/me").get(isAuthentication, getMyProfile);

// Change Password
router.route("/changepassword").put(isAuthentication, changePassword);

// Update Profile
router.route("/updateprofile").put(isAuthentication, updateProfile);

// Update Profile Picture
router
  .route("/updateprofilepicture")
  .put(isAuthentication, singleUpload, updateProfilePic);

// Add to playList
router.route("/addtoplaylist").post(isAuthentication, addToPlayList);

// Delete from PlayList
router
  .route("/removefromplaylist")
  .delete(isAuthentication, deleteFromPlayList);

export default router;
