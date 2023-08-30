import express from "express";
import { isAuthentication } from "../middlewares/Auth.js";
import {
  buySubscription,
  getRazorPayKey,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = express.Router();

// Buy Subscription
router.route("/subscribe").get(isAuthentication, buySubscription);
router
  .route("/paymentverification")
  .post(isAuthentication, paymentVerification);

router.route("/razorpaykey").get(getRazorPayKey);

export default router;
