"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_config_1 = require("../config/http.config");
const appError_1 = require("../utils/appError");
const zod_1 = require("zod");
const error_code_enum_1 = require("../enums/error-code.enum");
const formatZodError = (res, error) => {
    const errors = error?.issues?.map((err) => ({
        field: err.path.join("."),
        message: err.message,
    }));
    return res.status(http_config_1.HTTPSTATUS.BAD_REQUEST).json({
        message: "Validation failed",
        errors: errors,
        errorCode: error_code_enum_1.ErrorCodeEnum.VALIDATION_ERROR,
    });
};
const errorHandler = (error, req, res, next) => {
    console.error(`Error Occured on PATH: ${req.path} `, error);
    if (error instanceof SyntaxError) {
        return res.status(http_config_1.HTTPSTATUS.BAD_REQUEST).json({
            message: "Invalid JSON format. Please check your request body.",
        });
    }
    if (error instanceof zod_1.ZodError) {
        return formatZodError(res, error);
    }
    if (error instanceof appError_1.AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
            errorCode: error.errorCode,
        });
    }
    return res.status(http_config_1.HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        error: error?.message || "Unknow error occurred",
    });
};
exports.errorHandler = errorHandler;
