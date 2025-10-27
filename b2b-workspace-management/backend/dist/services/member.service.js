"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinWorkspaceByInviteService = exports.getMemberRoleInWorkspace = void 0;
const error_code_enum_1 = require("../enums/error-code.enum");
const role_enum_1 = require("../enums/role.enum");
const member_model_1 = __importDefault(require("../models/member.model"));
const roles_permission_model_1 = __importDefault(require("../models/roles-permission.model"));
const workspace_model_1 = __importDefault(require("../models/workspace.model"));
const appError_1 = require("../utils/appError");
const getMemberRoleInWorkspace = async (userId, workspaceId) => {
    const workspace = await workspace_model_1.default.findById(workspaceId);
    if (!workspace) {
        throw new appError_1.NotFoundException("Workspace not found");
    }
    const member = await member_model_1.default.findOne({
        userId,
        workspaceId,
    }).populate("role");
    if (!member) {
        throw new appError_1.UnauthorizedException("You are not a member of this workspace", error_code_enum_1.ErrorCodeEnum.ACCESS_UNAUTHORIZED);
    }
    const roleName = member.role?.name;
    return { role: roleName };
};
exports.getMemberRoleInWorkspace = getMemberRoleInWorkspace;
const joinWorkspaceByInviteService = async (userId, inviteCode) => {
    // Find workspace by invite code
    const workspace = await workspace_model_1.default.findOne({ inviteCode }).exec();
    if (!workspace) {
        throw new appError_1.NotFoundException("Invalid invite code or workspace not found");
    }
    // Check if user is already a member
    const existingMember = await member_model_1.default.findOne({
        userId,
        workspaceId: workspace._id,
    }).exec();
    if (existingMember) {
        throw new appError_1.BadRequestException("You are already a member of this workspace");
    }
    const role = await roles_permission_model_1.default.findOne({ name: role_enum_1.Roles.MEMBER });
    if (!role) {
        throw new appError_1.NotFoundException("Role not found");
    }
    // Add user to workspace as a member
    const newMember = new member_model_1.default({
        userId,
        workspaceId: workspace._id,
        role: role._id,
    });
    await newMember.save();
    return { workspaceId: workspace._id, role: role.name };
};
exports.joinWorkspaceByInviteService = joinWorkspaceByInviteService;
