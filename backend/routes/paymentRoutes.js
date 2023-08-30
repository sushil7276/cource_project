import express from "express";
import { isAuthentication } from "../middlewares/Auth.js";
import { buySubscription } from "../controllers/paymentController.js";

const router = express.Router();

// Buy Subscription
router.route("/subscribe").post(isAuthentication, buySubscription);

export default router;
