"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_controller_1 = require("../controllers/member.controller");
const memberRoutes = (0, express_1.Router)();
memberRoutes.post("/workspace/:inviteCode/join", member_controller_1.joinWorkspaceController);
exports.default = memberRoutes;
