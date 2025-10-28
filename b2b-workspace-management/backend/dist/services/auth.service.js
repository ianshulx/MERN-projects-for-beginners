"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserService = exports.registerUserService = exports.loginOrCreateAccountService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user.model"));
const account_model_1 = __importDefault(require("../models/account.model"));
const workspace_model_1 = __importDefault(require("../models/workspace.model"));
const roles_permission_model_1 = __importDefault(require("../models/roles-permission.model"));
const role_enum_1 = require("../enums/role.enum");
const appError_1 = require("../utils/appError");
const member_model_1 = __importDefault(require("../models/member.model"));
const account_provider_enum_1 = require("../enums/account-provider.enum");
const loginOrCreateAccountService = async (data) => {
    const { providerId, provider, displayName, email, picture } = data;
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        console.log("Started Session...");
        let user = await user_model_1.default.findOne({ email }).session(session);
        if (!user) {
            // Create a new user if it doesn't exist
            user = new user_model_1.default({
                email,
                name: displayName,
                profilePicture: picture || null,
            });
            await user.save({ session });
            const account = new account_model_1.default({
                userId: user._id,
                provider: provider,
                providerId: providerId,
            });
            await account.save({ session });
            // 3. Create a new workspace for the new user
            const workspace = new workspace_model_1.default({
                name: `My Workspace`,
                description: `Workspace created for ${user.name}`,
                owner: user._id,
            });
            await workspace.save({ session });
            const ownerRole = await roles_permission_model_1.default.findOne({
                name: role_enum_1.Roles.OWNER,
            }).session(session);
            if (!ownerRole) {
                throw new appError_1.NotFoundException("Owner role not found");
            }
            const member = new member_model_1.default({
                userId: user._id,
                workspaceId: workspace._id,
                role: ownerRole._id,
                joinedAt: new Date(),
            });
            await member.save({ session });
            user.currentWorkspace = workspace._id;
            await user.save({ session });
        }
        await session.commitTransaction();
        session.endSession();
        console.log("End Session...");
        return { user };
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
    finally {
        session.endSession();
    }
};
exports.loginOrCreateAccountService = loginOrCreateAccountService;
const registerUserService = async (body) => {
    const { email, name, password } = body;
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const existingUser = await user_model_1.default.findOne({ email }).session(session);
        if (existingUser) {
            throw new appError_1.BadRequestException("Email already exists");
        }
        const user = new user_model_1.default({
            email,
            name,
            password,
        });
        await user.save({ session });
        const account = new account_model_1.default({
            userId: user._id,
            provider: account_provider_enum_1.ProviderEnum.EMAIL,
            providerId: email,
        });
        await account.save({ session });
        // 3. Create a new workspace for the new user
        const workspace = new workspace_model_1.default({
            name: `My Workspace`,
            description: `Workspace created for ${user.name}`,
            owner: user._id,
        });
        await workspace.save({ session });
        const ownerRole = await roles_permission_model_1.default.findOne({
            name: role_enum_1.Roles.OWNER,
        }).session(session);
        if (!ownerRole) {
            throw new appError_1.NotFoundException("Owner role not found");
        }
        const member = new member_model_1.default({
            userId: user._id,
            workspaceId: workspace._id,
            role: ownerRole._id,
            joinedAt: new Date(),
        });
        await member.save({ session });
        user.currentWorkspace = workspace._id;
        await user.save({ session });
        await session.commitTransaction();
        session.endSession();
        console.log("End Session...");
        return {
            userId: user._id,
            workspaceId: workspace._id,
        };
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
exports.registerUserService = registerUserService;
const verifyUserService = async ({ email, password, provider = account_provider_enum_1.ProviderEnum.EMAIL, }) => {
    const account = await account_model_1.default.findOne({ provider, providerId: email });
    if (!account) {
        throw new appError_1.NotFoundException("Invalid email or password");
    }
    const user = await user_model_1.default.findById(account.userId);
    if (!user) {
        throw new appError_1.NotFoundException("User not found for the given account");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new appError_1.UnauthorizedException("Invalid email or password");
    }
    return user.omitPassword();
};
exports.verifyUserService = verifyUserService;
