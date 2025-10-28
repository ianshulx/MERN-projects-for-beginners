"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinWorkspaceController = void 0;
const asyncHandler_middleware_1 = require("../middlewares/asyncHandler.middleware");
const zod_1 = require("zod");
const http_config_1 = require("../config/http.config");
const member_service_1 = require("../services/member.service");
exports.joinWorkspaceController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const inviteCode = zod_1.z.string().parse(req.params.inviteCode);
    const userId = req.user?._id;
    const { workspaceId, role } = await (0, member_service_1.joinWorkspaceByInviteService)(userId, inviteCode);
    return res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "Successfully joined the workspace",
        workspaceId,
        role,
    });
});
