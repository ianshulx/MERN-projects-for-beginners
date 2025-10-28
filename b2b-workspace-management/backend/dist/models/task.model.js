"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const task_enum_1 = require("../enums/task.enum");
const uuid_1 = require("../utils/uuid");
const taskSchema = new mongoose_1.Schema({
    taskCode: {
        type: String,
        unique: true,
        default: uuid_1.generateTaskCode,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        default: null,
    },
    project: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    workspace: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(task_enum_1.TaskStatusEnum),
        default: task_enum_1.TaskStatusEnum.TODO,
    },
    priority: {
        type: String,
        enum: Object.values(task_enum_1.TaskPriorityEnum),
        default: task_enum_1.TaskPriorityEnum.MEDIUM,
    },
    assignedTo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    dueDate: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});
const TaskModel = mongoose_1.default.model("Task", taskSchema);
exports.default = TaskModel;
