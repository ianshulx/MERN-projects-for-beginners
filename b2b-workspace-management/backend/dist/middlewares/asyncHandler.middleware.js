"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const asyncHandler = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    }
    catch (error) {
        next(error);
    }
};
exports.asyncHandler = asyncHandler;
