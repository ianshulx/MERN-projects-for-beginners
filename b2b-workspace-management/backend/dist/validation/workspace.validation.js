"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkspaceSchema = exports.createWorkspaceSchema = exports.changeRoleSchema = exports.workspaceIdSchema = exports.descriptionSchema = exports.nameSchema = void 0;
const zod_1 = require("zod");
exports.nameSchema = zod_1.z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(255);
exports.descriptionSchema = zod_1.z.string().trim().optional();
exports.workspaceIdSchema = zod_1.z
    .string()
    .trim()
    .min(1, { message: "Workspace ID is required" });
exports.changeRoleSchema = zod_1.z.object({
    roleId: zod_1.z.string().trim().min(1),
    memberId: zod_1.z.string().trim().min(1),
});
exports.createWorkspaceSchema = zod_1.z.object({
    name: exports.nameSchema,
    description: exports.descriptionSchema,
});
exports.updateWorkspaceSchema = zod_1.z.object({
    name: exports.nameSchema,
    description: exports.descriptionSchema,
});
