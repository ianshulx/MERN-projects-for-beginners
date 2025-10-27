"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const database_config_1 = __importDefault(require("../config/database.config"));
const roles_permission_model_1 = __importDefault(require("../models/roles-permission.model"));
const role_permission_1 = require("../utils/role-permission");
const seedRoles = async () => {
    console.log("Seeding roles started...");
    try {
        await (0, database_config_1.default)();
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        console.log("Clearing existing roles...");
        await roles_permission_model_1.default.deleteMany({}, { session });
        for (const roleName in role_permission_1.RolePermissions) {
            const role = roleName;
            const permissions = role_permission_1.RolePermissions[role];
            // Check if the role already exists
            const existingRole = await roles_permission_model_1.default.findOne({ name: role }).session(session);
            if (!existingRole) {
                const newRole = new roles_permission_model_1.default({
                    name: role,
                    permissions: permissions,
                });
                await newRole.save({ session });
                console.log(`Role ${role} added with permissions.`);
            }
            else {
                console.log(`Role ${role} already exists.`);
            }
        }
        await session.commitTransaction();
        console.log("Transaction committed.");
        session.endSession();
        console.log("Session ended.");
        console.log("Seeding completed successfully.");
    }
    catch (error) {
        console.error("Error during seeding:", error);
    }
};
seedRoles().catch((error) => console.error("Error running seed script:", error));
