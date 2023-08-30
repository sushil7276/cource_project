import express from "express";
import { isAuthentication } from "../middlewares/Auth.js";
import {
  buySubscription,
  cancelSubscription,
  getRazorPayKey,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = express.Router();

// Buy Subscription
router.route("/subscribe").get(isAuthentication, buySubscription);

// Verify Payment and save reference in database
router
  .route("/paymentverification")
  .post(isAuthentication, paymentVerification);

// Get Razorpay key
router.route("/razorpaykey").get(getRazorPayKey);

// Cancel Subscription
router.route("/subscribe/cancel").delete(isAuthentication, cancelSubscription);

export default router;
