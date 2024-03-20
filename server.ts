import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();

// libraries
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

// middleware
import errorHandlerMiddleware from "./src/middleware/errorHandler.js";
import { helmetConfig } from "./helmetconfig.js";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cookieParser());
app.use(express.json());
app.use(helmet(helmetConfig));
app.use(mongoSanitize());

app.get("/api/v1/test", (req, res) => {
  res.send({ msg: "This is a test!" });
});

// return frontend index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

// test router
// app.route("/api/v1/seed").post(seedMonth);

// if none of the above routes match respond with status 404
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on port ${port}...`);
  });
  // runCronScheduleCheckup();
} catch (error) {
  console.log(error);
  process.exit(1);
}
