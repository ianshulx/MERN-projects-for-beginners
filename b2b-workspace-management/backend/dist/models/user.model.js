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
const bcrypt_1 = require("../utils/bcrypt");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: false,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: { type: String, select: true },
    profilePicture: {
        type: String,
        default: null,
    },
    currentWorkspace: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Workspace",
    },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: null },
}, {
    timestamps: true,
});
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        if (this.password) {
            this.password = await (0, bcrypt_1.hashValue)(this.password);
        }
    }
    next();
});
userSchema.methods.omitPassword = function () {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};
userSchema.methods.comparePassword = async function (value) {
    return (0, bcrypt_1.compareValue)(value, this.password);
};
const UserModel = mongoose_1.default.model("User", userSchema);
exports.default = UserModel;
