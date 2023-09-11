import express from "express";
import {
  addToPlayList,
  changePassword,
  deleteFromPlayList,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  resetPassword,
  updateProfile,
  updateProfilePic,
  updateUserRole,
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthentication } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// Get All Users --- Only Admin
router.route("/admin/users").get(isAuthentication, authorizeAdmin, getAllUsers);

// Register
router.route("/register").post(singleUpload, register);

// Login and Logout
router.route("/login").post(login);
router.route("/logout").get(logout);

// Forget Password
router.route("/forgetpassword").post(forgetPassword);

// Reset Password
router.route("/resetpassword/:token").put(resetPassword);

// Get My Profile / delete My Profile --- Only Logged In User
router
  .route("/me")
  .get(isAuthentication, getMyProfile)
  .delete(isAuthentication, deleteMyProfile);

// Change Password
router.route("/changepassword").put(isAuthentication, changePassword);

// Update Profile
router.route("/updateprofile").put(isAuthentication, updateProfile);

// Update Profile Picture
router
  .route("/updateprofilepicture")
  .put(isAuthentication, singleUpload, updateProfilePic);

// Update User Role/ Delete User --- Only Admin
router
  .route("/admin/user/:id")
  .put(isAuthentication, singleUpload, updateUserRole)
  .delete(isAuthentication, singleUpload, deleteUser);

// Add to playList
router.route("/addtoplaylist").post(isAuthentication, addToPlayList);

// Delete from PlayList
router
  .route("/removefromplaylist")
  .delete(isAuthentication, deleteFromPlayList);

export default router;
