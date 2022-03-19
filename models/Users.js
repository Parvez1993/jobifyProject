// Using Node.js `require()`
const mongoose = require("mongoose");
var validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
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
    // minlength: 6,
    // validate: {
    //   validator: validator.isStrongPassword,
    //   message:
    //     "Password must contain at least one upper and lower character, letter, symbol",
    // },
    select: false,
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "my city",
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // // Delete passwordConfirm field
  // this.passwordConfirm = undefined;
  next();
});

//check if password is correct or not

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model("User", UserSchema);

module.exports = User;
