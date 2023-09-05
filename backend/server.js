import app from "./app.js";
import { config } from "dotenv";
import { connectDB } from "./config/database.js";
import cloudinary from "cloudinary";
import Razorpay from "razorpay";
import nodeCron from "node-cron";
import { Stats } from "./models/Stats.js";

connectDB();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Razorpay
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

config({
  path: "./config/config.env",
});

// node-corn call 1st of every month
nodeCron.schedule("0 0 0 1 * *", async () => {
  try {
    await Stats.create({});
  } catch (err) {
    console.log(err);
  }
});

const temp = async () => {
  await Stats.create({});
};

temp();

app.listen(process.env.PORT, () => {
  console.log(`server started on Port: ${process.env.PORT}`);
});
