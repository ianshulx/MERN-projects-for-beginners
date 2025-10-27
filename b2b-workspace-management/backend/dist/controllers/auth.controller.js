"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOutController = exports.loginController = exports.registerUserController = exports.googleLoginCallback = void 0;
const asyncHandler_middleware_1 = require("../middlewares/asyncHandler.middleware");
const app_config_1 = require("../config/app.config");
const auth_validation_1 = require("../validation/auth.validation");
const http_config_1 = require("../config/http.config");
const auth_service_1 = require("../services/auth.service");
const passport_1 = __importDefault(require("passport"));
exports.googleLoginCallback = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const currentWorkspace = req.user?.currentWorkspace;
    if (!currentWorkspace) {
        return res.redirect(`${app_config_1.config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`);
    }
    return res.redirect(`${app_config_1.config.FRONTEND_ORIGIN}/workspace/${currentWorkspace}`);
});
exports.registerUserController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    const body = auth_validation_1.registerSchema.parse({
        ...req.body,
    });
    await (0, auth_service_1.registerUserService)(body);
    return res.status(http_config_1.HTTPSTATUS.CREATED).json({
        message: "User created successfully",
    });
});
exports.loginController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res, next) => {
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(http_config_1.HTTPSTATUS.UNAUTHORIZED).json({
                message: info?.message || "Invalid email or password",
            });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(http_config_1.HTTPSTATUS.OK).json({
                message: "Logged in successfully",
                user,
            });
        });
    })(req, res, next);
});
exports.logOutController = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res
                .status(http_config_1.HTTPSTATUS.INTERNAL_SERVER_ERROR)
                .json({ error: "Failed to log out" });
        }
    });
    req.session = null;
    return res
        .status(http_config_1.HTTPSTATUS.OK)
        .json({ message: "Logged out successfully" });
});
