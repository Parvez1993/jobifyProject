const User = require("../models/Users.js");
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");

exports.register = async (req, res, next) => {
  const { firstName, lastName, password, email } = req.body;

  if (!firstName || !lastName || email || password) {
    throw new Error("Please provide all the values");
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
