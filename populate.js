const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const connectDB = require("./server");
const Job = require("./models/Job.js");

const start = async () => {
  try {
    mongoose.connect(process.env.DB, () => {
      console.log("connected");
    });

    await Job.deleteMany();

    const jsonProducts = JSON.parse(
      fs.readFileSync(`${__dirname}/mock-data.json`, "utf-8")
    );
    await Job.create(jsonProducts);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
