const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
require("express-async-errors");
const router = require("./routes/authRouter.js");
const jobRouter = require("./routes/jobRoutes.js");
const notFoundMiddleware = require("./middleware/notFoundMiddleware.js");
const errorMiddleware = require("./middleware/error-handler.js");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const authenticateUser = require("./middleware/auth.js");
const { dirname } = require("path");
const { fileURLToPath } = require("url");
const path = require("path");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimiter = require("express-rate-limit");

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use(cors());
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

const __directoryname = dirname(
  require("url").pathToFileURL(__filename).toString()
);

// only when ready to deploy
app.use(express.static(path.resolve(__directoryname, "./client/build")));

//ratomg

// /middleware

app.use("/api/v1/auth", router);
app.use("/api/v1/jobs", authenticateUser, jobRouter);

app.get("*", function (request, response) {
  response.sendFile(
    path.resolve(__directoryname, "./client/build", "index.html")
  );
});

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
