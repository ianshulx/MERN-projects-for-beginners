"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("../utils/appError");
const isAuthenticated = (req, res, next) => {
    if (!req.user || !req.user._id) {
        throw new appError_1.UnauthorizedException("Unauthorized. Please log in.");
    }
    next();
};
exports.default = isAuthenticated;
