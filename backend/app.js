import express from "express";
import { config } from "dotenv";

// dotenv file configuration
config({
  path: "./config/config.env",
});

const app = express();

// importing & Using Routes
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";

app.use("/api/v1", course);
app.use("/api/v1", user);

export default app;
