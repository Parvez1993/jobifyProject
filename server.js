const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
require("express-async-errors");
const router = require("./routes/authRouter.js");
const jobRouter = require("./routes/jobRoutes.js");
const notFoundMiddleware = require("./middleware/notFoundMiddleware.js");
const errorMiddleware = require("./middleware/error-handler.js");

const app = express();
app.use(express.json());

dotenv.config();

const DB = process.env.DB;

mongoose.connect(DB, () => {
  console.log("connected");
});

//Routes

app.get("/", (req, res) => {
  throw new Error("error");
  res.send("Welcome!");
});

// /middleware

app.use("/api/v1/auth", router);
app.use("/api/v1/jobs", jobRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

//unhandled error

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));