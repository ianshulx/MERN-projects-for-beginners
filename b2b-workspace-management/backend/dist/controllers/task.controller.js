"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskController = exports.getTaskByIdController = exports.getAllTasksController = exports.updateTaskController = exports.createTaskController = void 0;
const asyncHandler_middleware_1 = require("../middlewares/asyncHandler.middleware");
const task_validation_1 = require("../validation/task.validation");
const project_validation_1 = require("../validation/project.validation");
const workspace_validation_1 = require("../validation/workspace.validation");
const role_enum_1 = require("../enums/role.enum");
const member_service_1 = require("../services/member.service");
const roleGuard_1 = require("../utils/roleGuard");
const task_service_1 = require("../services/task.service");
const http_config_1 = require("../config/http.config");
exports.createTaskController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user?._id;
    const body = task_validation_1.createTaskSchema.parse(req.body);
    const projectId = project_validation_1.projectIdSchema.parse(req.params.projectId);
    const workspaceId = workspace_validation_1.workspaceIdSchema.parse(req.params.workspaceId);
    const { role } = await (0, member_service_1.getMemberRoleInWorkspace)(userId, workspaceId);
    (0, roleGuard_1.roleGuard)(role, [role_enum_1.Permissions.CREATE_TASK]);
    const { task } = await (0, task_service_1.createTaskService)(workspaceId, projectId, userId, body);
    return res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "Task created successfully",
        task,
    });
});
exports.updateTaskController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user?._id;
    const body = task_validation_1.updateTaskSchema.parse(req.body);
    const taskId = task_validation_1.taskIdSchema.parse(req.params.id);
    const projectId = project_validation_1.projectIdSchema.parse(req.params.projectId);
    const workspaceId = workspace_validation_1.workspaceIdSchema.parse(req.params.workspaceId);
    const { role } = await (0, member_service_1.getMemberRoleInWorkspace)(userId, workspaceId);
    (0, roleGuard_1.roleGuard)(role, [role_enum_1.Permissions.EDIT_TASK]);
    const { updatedTask } = await (0, task_service_1.updateTaskService)(workspaceId, projectId, taskId, body);
    return res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "Task updated successfully",
        task: updatedTask,
    });
});
exports.getAllTasksController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user?._id;
    const workspaceId = workspace_validation_1.workspaceIdSchema.parse(req.params.workspaceId);
    const filters = {
        projectId: req.query.projectId,
        status: req.query.status
            ? req.query.status?.split(",")
            : undefined,
        priority: req.query.priority
            ? req.query.priority?.split(",")
            : undefined,
        assignedTo: req.query.assignedTo
            ? req.query.assignedTo?.split(",")
            : undefined,
        keyword: req.query.keyword,
        dueDate: req.query.dueDate,
    };
    const pagination = {
        pageSize: parseInt(req.query.pageSize) || 10,
        pageNumber: parseInt(req.query.pageNumber) || 1,
    };
    const { role } = await (0, member_service_1.getMemberRoleInWorkspace)(userId, workspaceId);
    (0, roleGuard_1.roleGuard)(role, [role_enum_1.Permissions.VIEW_ONLY]);
    const result = await (0, task_service_1.getAllTasksService)(workspaceId, filters, pagination);
    return res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "All tasks fetched successfully",
        ...result,
    });
});
exports.getTaskByIdController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user?._id;
    const taskId = task_validation_1.taskIdSchema.parse(req.params.id);
    const projectId = project_validation_1.projectIdSchema.parse(req.params.projectId);
    const workspaceId = workspace_validation_1.workspaceIdSchema.parse(req.params.workspaceId);
    const { role } = await (0, member_service_1.getMemberRoleInWorkspace)(userId, workspaceId);
    (0, roleGuard_1.roleGuard)(role, [role_enum_1.Permissions.VIEW_ONLY]);
    const task = await (0, task_service_1.getTaskByIdService)(workspaceId, projectId, taskId);
    return res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "Task fetched successfully",
        task,
    });
});
exports.deleteTaskController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.user?._id;
    const taskId = task_validation_1.taskIdSchema.parse(req.params.id);
    const workspaceId = workspace_validation_1.workspaceIdSchema.parse(req.params.workspaceId);
    const { role } = await (0, member_service_1.getMemberRoleInWorkspace)(userId, workspaceId);
    (0, roleGuard_1.roleGuard)(role, [role_enum_1.Permissions.DELETE_TASK]);
    await (0, task_service_1.deleteTaskService)(workspaceId, taskId);
    return res.status(http_config_1.HTTPSTATUS.OK).json({
        message: "Task deleted successfully",
    });
});
