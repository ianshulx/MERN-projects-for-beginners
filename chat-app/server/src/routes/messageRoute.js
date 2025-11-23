import express from "express";
import { protectRoute } from "../middleware/AuthMiddleware.js";
import {
  getMessageById,
  getUserForSidebar,
  sendMessage,
} from "../controller/messageController.js";
const route = express.Router();

route.get("/users", protectRoute, getUserForSidebar);
route.get("/:id", protectRoute, getMessageById);
route.post("/:id", protectRoute, sendMessage);

export default route;
