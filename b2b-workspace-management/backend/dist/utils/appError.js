"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = exports.UnauthorizedException = exports.BadRequestException = exports.NotFoundException = exports.InternalServerException = exports.HttpException = exports.AppError = void 0;
const http_config_1 = require("../config/http.config");
const error_code_enum_1 = require("../enums/error-code.enum");
class AppError extends Error {
    constructor(message, statusCode = http_config_1.HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class HttpException extends AppError {
    constructor(message = "Http Exception Error", statusCode, errorCode) {
        super(message, statusCode, errorCode);
    }
}
exports.HttpException = HttpException;
class InternalServerException extends AppError {
    constructor(message = "Internal Server Error", errorCode) {
        super(message, http_config_1.HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode || error_code_enum_1.ErrorCodeEnum.INTERNAL_SERVER_ERROR);
    }
}
exports.InternalServerException = InternalServerException;
class NotFoundException extends AppError {
    constructor(message = "Resource not found", errorCode) {
        super(message, http_config_1.HTTPSTATUS.NOT_FOUND, errorCode || error_code_enum_1.ErrorCodeEnum.RESOURCE_NOT_FOUND);
    }
}
exports.NotFoundException = NotFoundException;
class BadRequestException extends AppError {
    constructor(message = "Bad Request", errorCode) {
        super(message, http_config_1.HTTPSTATUS.BAD_REQUEST, errorCode || error_code_enum_1.ErrorCodeEnum.VALIDATION_ERROR);
    }
}
exports.BadRequestException = BadRequestException;
class UnauthorizedException extends AppError {
    constructor(message = "Unauthorized Access", errorCode) {
        super(message, http_config_1.HTTPSTATUS.UNAUTHORIZED, errorCode || error_code_enum_1.ErrorCodeEnum.ACCESS_UNAUTHORIZED);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddenException extends AppError {
    constructor(message = "Forbidden Access", errorCode) {
        super(message, http_config_1.HTTPSTATUS.FORBIDDEN, // 403
        errorCode || error_code_enum_1.ErrorCodeEnum.ACCESS_UNAUTHORIZED);
    }
}
exports.ForbiddenException = ForbiddenException;
