"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = exports.taskIdSchema = exports.dueDateSchema = exports.statusSchema = exports.prioritySchema = exports.assignedToSchema = exports.descriptionSchema = exports.titleSchema = void 0;
const zod_1 = require("zod");
const task_enum_1 = require("../enums/task.enum");
exports.titleSchema = zod_1.z.string().trim().min(1).max(255);
exports.descriptionSchema = zod_1.z.string().trim().optional();
exports.assignedToSchema = zod_1.z.string().trim().min(1).nullable().optional();
exports.prioritySchema = zod_1.z.enum(Object.values(task_enum_1.TaskPriorityEnum));
exports.statusSchema = zod_1.z.enum(Object.values(task_enum_1.TaskStatusEnum));
exports.dueDateSchema = zod_1.z
    .string()
    .trim()
    .optional()
    .refine((val) => {
    return !val || !isNaN(Date.parse(val));
}, {
    message: "Invalid date format. Please provide a valid date string.",
});
exports.taskIdSchema = zod_1.z.string().trim().min(1);
exports.createTaskSchema = zod_1.z.object({
    title: exports.titleSchema,
    description: exports.descriptionSchema,
    priority: exports.prioritySchema,
    status: exports.statusSchema,
    assignedTo: exports.assignedToSchema,
    dueDate: exports.dueDateSchema,
});
exports.updateTaskSchema = zod_1.z.object({
    title: exports.titleSchema,
    description: exports.descriptionSchema,
    priority: exports.prioritySchema,
    status: exports.statusSchema,
    assignedTo: exports.assignedToSchema,
    dueDate: exports.dueDateSchema,
});
