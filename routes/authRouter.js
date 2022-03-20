const express = require("express");
const authController = require("../controller/authController.js");
const authenticateUser = require("../middleware/auth.js");

const router = express.Router();

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/updateUser").patch(authenticateUser, authController.updateUser);

module.exports = router;
