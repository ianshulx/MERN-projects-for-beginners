const express = require("express");
const UserRouter = express.Router();

const {
  registerUser,
  loginUser,
  userCredits,
} = require("../controllers/userController");
const UserAuth = require("../middlewares/auth");

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.get("/credits", UserAuth, userCredits);

module.exports = UserRouter;
