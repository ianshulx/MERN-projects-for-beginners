"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMemberFromWorkspaceController = exports.leaveWorkspaceByIdController = exports.deleteWorkspaceByIdController = exports.updateWorkspaceByIdController = exports.changeWorkspaceMemberRoleController = exports.getWorkspaceAnalyticsController = exports.getWorkspaceMembersController = exports.getWorkspaceByIdController = exports.getAllWorkspacesUserIsMemberController = exports.createWorkspaceController = void 0;
const asyncHandler_middleware_1 = require("../middlewares/asyncHandler.middleware");
const workspace_validation_1 = require("../validation/workspace.validation");
const http_config_1 = require("../config/http.config");
const workspace_service_1 = require("../services/workspace.service");
const member_service_1 = require("../services/member.service");
const role_enum_1 = require("../enums/role.enum");
const roleGuard_1 = require("../utils/roleGuard");
const workspace_validation_2 = require("../validation/workspace.validation");
exports.createWorkspaceController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const body = workspace_validation_1.createWorkspaceSchema.parse(req.body);
    const userId = req.user?._id;
    const { workspace } = await (0, workspace_service_1.createWorkspaceService)(userId, body);
    return res.status(http_config_1.HTTPSTATUS.CREATED).json({
        message: "Workspace created successfully",
        workspace,
    });
});
// Controller: Get all workspaces the user is part of
exports.getAllWorkspacesUserIsMemberController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user?._id;
    const { workspaces } = await (0, workspace_service_1.getAllWorkspacesUserIsMemberService)(userId);
    return res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "User workspaces fetched successfully",
        workspaces,
    });
});
exports.getWorkspaceByIdController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const workspaceId = workspace_validation_1.workspaceIdSchema.parse(req.params.id);
    const userId = req.user?._id;
    await (0, member_service_1.getMemberRoleInWorkspace)(userId, workspaceId);
    const { workspace } = await (0, workspace_service_1.getWorkspaceByIdService)(workspaceId);
    return res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "Workspace fetched successfully",
        workspace,
    });
});
exports.getWorkspaceMembersController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const workspaceId = workspace_validation_1.workspaceIdSchema.parse(req.params.id);
    const userId = req.user?._id;
    const { role } = await (0, member_service_1.getMemberRoleInWorkspace)(userId, workspaceId);
    (0, roleGuard_1.roleGuard)(role, [role_enum_1.Permissions.VIEW_ONLY]);
    const { members, roles } = await (0, workspace_service_1.getWorkspaceMembersService)(workspaceId);
    return res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "Workspace members retrieved successfully",
        members,
        roles,
    });
});
exports.getWorkspaceAnalyticsController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const workspaceId = workspace_validation_1.workspaceIdSchema.parse(req.params.id);
    const userId = req.user?._id;
    const { role } = await (0, member_service_1.getMemberRoleInWorkspace)(userId, workspaceId);
    (0, roleGuard_1.roleGuard)(role, [role_enum_1.Permissions.VIEW_ONLY]);
    const { analytics } = await (0, workspace_service_1.getWorkspaceAnalyticsService)(workspaceId);
    return res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "Workspace analytics retrieved successfully",
        analytics,
    });
});
exports.changeWorkspaceMemberRoleController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const workspaceId = workspace_validation_1.workspaceIdSchema.parse(req.params.id);
    const { memberId, roleId } = workspace_validation_1.changeRoleSchema.parse(req.body);
    const userId = req.user?._id;
    const { role } = await (0, member_service_1.getMemberRoleInWorkspace)(userId, workspaceId);
    (0, roleGuard_1.roleGuard)(role, [role_enum_1.Permissions.CHANGE_MEMBER_ROLE]);
    const { member } = await (0, workspace_service_1.changeMemberRoleService)(workspaceId, memberId, roleId);
    return res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "Member Role changed successfully",
        member,
    });
});
exports.updateWorkspaceByIdController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const workspaceId = workspace_validation_1.workspaceIdSchema.parse(req.params.id);
    const { name, description } = workspace_validation_2.updateWorkspaceSchema.parse(req.body);
    const userId = req.user?._id;
    const { role } = await (0, member_service_1.getMemberRoleInWorkspace)(userId, workspaceId);
    (0, roleGuard_1.roleGuard)(role, [role_enum_1.Permissions.EDIT_WORKSPACE]);
    const { workspace } = await (0, workspace_service_1.updateWorkspaceByIdService)(workspaceId, name, description);
    return res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "Workspace updated successfully",
        workspace,
    });
});
exports.deleteWorkspaceByIdController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const workspaceId = workspace_validation_1.workspaceIdSchema.parse(req.params.id);
    const userId = req.user?._id;
    const { role } = await (0, member_service_1.getMemberRoleInWorkspace)(userId, workspaceId);
    (0, roleGuard_1.roleGuard)(role, [role_enum_1.Permissions.DELETE_WORKSPACE]);
    const { currentWorkspace } = await (0, workspace_service_1.deleteWorkspaceService)(workspaceId, userId);
    return res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "Workspace deleted successfully",
        currentWorkspace,
    });
});
exports.leaveWorkspaceByIdController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const workspaceId = workspace_validation_1.workspaceIdSchema.parse(req.params.id);
    const userId = req.user?._id;
    const { currentWorkspace } = await (0, workspace_service_1.deleteWorkspaceService)(workspaceId, userId);
    return res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "Workspace left successfully",
        currentWorkspace,
    });
});
exports.removeMemberFromWorkspaceController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const workspaceId = workspace_validation_1.workspaceIdSchema.parse(req.params.workspaceId);
    const memberId = req.params.memberId;
    const userId = req.user?._id;
    const { role } = await (0, member_service_1.getMemberRoleInWorkspace)(userId, workspaceId);
    (0, roleGuard_1.roleGuard)(role, [role_enum_1.Permissions.REMOVE_MEMBER]);
    await (0, workspace_service_1.removeMemberService)(workspaceId, memberId);
    return res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "Member removed from workspace successfully",
    });
});
