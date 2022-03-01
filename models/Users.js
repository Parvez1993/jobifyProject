// Using Node.js `require()`
const mongoose = require("mongoose");
var validator = require("validator");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: [validator.isEmail, "Please provide a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    validate: {
      validator: validator.isStrongPassword,
      message:
        "Password must contain at least one upper and lower character, letter, symbol",
    },
    select: false,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "lastName",
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "my city",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
