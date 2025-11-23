import express from "express";
const route = express.Router();
import { signup, login, logout, updateProfilePic, checkAuth } from "../controller/authController.js";
import { protectRoute } from "../middleware/AuthMiddleware.js";

route.post("/login", login);
route.post("/logout", logout);
route.post("/signup", signup);
route.put("/profile-update", protectRoute, updateProfilePic);
route.get('/check',protectRoute,checkAuth)

export default route;
