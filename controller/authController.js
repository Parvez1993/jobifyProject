const User = require("../models/Users.js");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnAuthenticatedError } = require("../errors/index.js");

exports.register = async (req, res, next) => {
  const { firstName, lastName, password, email } = req.body;

  if (!firstName || !lastName || !email || password) {
    throw new BadRequestError("Please provide all the values");
  }

  if (!firstName || !lastName || !email || !password) {
    throw new BadRequestError("please provide all values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};
exports.login = async (req, res) => {
  console.log(req.body);
};
exports.updateUser = async (req, res) => {
  res.send("update user");
};
