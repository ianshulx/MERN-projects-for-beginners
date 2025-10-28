"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const getEnv = (key, defaultValue = "") => {
    const value = process.env[key];
    if (value === undefined) {
        if (defaultValue) {
            return defaultValue;
        }
        throw new Error(`Enviroment variable ${key} is not set`);
    }
    return value;
};
exports.getEnv = getEnv;
