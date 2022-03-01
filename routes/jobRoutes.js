const express = require("express");
const jobRouter = express.Router();
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
} = require("../controller/jobsController");
jobRouter.route("/").post(createJob).get(getAllJobs);
// place before :id
jobRouter.route("/stats").get(showStats);
jobRouter.route("/:id").delete(deleteJob).patch(updateJob);

module.exports = jobRouter;
