const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} = require("../errors/index");
const Job = require("../models/Job");
const checkPermissions = require("../utils/checkPermissions.js");

const mongoose = require("mongoose");
const createJob = async (req, res) => {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please Provide All Values");
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findOne({ id });

  if (!job) {
    throw new CustomError.NotFoundError(`No job with id : ${id}`);
  }

  checkPermissions(req.user, job.createdBy);

  await job.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
};

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  const { company, position, jobLocation } = req.body;

  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }
  const job = await Job.findOne({ id });

  if (!job) {
    throw new NotFoundError(`No job with id :${id}`);
  }

  // check permissions

  checkPermissions(req.user, job.createdBy);
  // alternative approach

  job.position = position;
  job.company = company;
  job.jobLocation = jobLocation;

  await job.save();
  res.status(StatusCodes.OK).json({ job });
};
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  res.status(StatusCodes.OK).json({ stats });
};
module.exports = { createJob, deleteJob, getAllJobs, updateJob, showStats };
