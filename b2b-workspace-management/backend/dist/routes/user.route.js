"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const userRoutes = (0, express_1.Router)();
userRoutes.get("/current", user_controller_1.getCurrentUserController);
exports.default = userRoutes;
