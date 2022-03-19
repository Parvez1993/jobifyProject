const User = require("../models/Users.js");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnAuthenticatedError } = require("../errors/index.js");
const mailsend = require("../config/sendmail.js");
var jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = async (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const location = user.location;
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  const link = token;
  const mail = await mailsend(user.email, link);

  if (mail) {
    res.status(statusCode).json({
      status: "failure",
    });
  } else {
    res.status(statusCode).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  }
};

exports.register = async (req, res, next) => {
  const { name, password, email } = req.body;
  console.log(name, password, email);
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all the values");
  }

  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create(req.body);

  createSendToken(user, StatusCodes.CREATED, req, res);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    throw new BadRequestError("Please provide all the values");
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new BadRequestError("Incorrect credentials");
  }

  // 3) If everything ok, send token to client

  createSendToken(user, StatusCodes.CREATED, res);
};
exports.updateUser = async (req, res) => {
  res.send("update user");
};
