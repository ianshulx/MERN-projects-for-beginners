"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = exports.passwordSchema = exports.emailSchema = void 0;
const zod_1 = require("zod");
exports.emailSchema = zod_1.z
    .string()
    .trim()
    .email("Invalid email address")
    .min(1)
    .max(255);
exports.passwordSchema = zod_1.z.string().trim().min(4);
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1).max(255),
    email: exports.emailSchema,
    password: exports.passwordSchema,
});
exports.loginSchema = zod_1.z.object({
    email: exports.emailSchema,
    password: exports.passwordSchema,
});
