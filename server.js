const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const notFoundMiddleware = require("./middleware/notFoundMiddleware.js");
const errorMiddleware = require("./middleware/error-handler.js");

const app = express();
dotenv.config();

const DB = process.env.DB;

mongoose.connect(DB, () => {
  console.log("connected");
});

app.get("/", (req, res) => {
  throw new Error("error");
  res.send("Welcome!");
});

// /middleware

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
