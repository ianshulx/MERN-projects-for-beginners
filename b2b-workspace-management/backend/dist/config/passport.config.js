"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_local_1 = require("passport-local");
const app_config_1 = require("./app.config");
const appError_1 = require("../utils/appError");
const account_provider_enum_1 = require("../enums/account-provider.enum");
const auth_service_1 = require("../services/auth.service");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: app_config_1.config.GOOGLE_CLIENT_ID,
    clientSecret: app_config_1.config.GOOGLE_CLIENT_SECRET,
    callbackURL: app_config_1.config.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"],
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        const { email, sub: googleId, picture } = profile._json;
        console.log(profile, "profile");
        console.log(googleId, "googleId");
        if (!googleId) {
            throw new appError_1.NotFoundException("Google ID (sub) is missing");
        }
        const { user } = await (0, auth_service_1.loginOrCreateAccountService)({
            provider: account_provider_enum_1.ProviderEnum.GOOGLE,
            displayName: profile.displayName,
            providerId: googleId,
            picture: picture,
            email: email,
        });
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
}));
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
    session: true,
}, async (email, password, done) => {
    try {
        const user = await (0, auth_service_1.verifyUserService)({ email, password });
        return done(null, user);
    }
    catch (error) {
        return done(error, false, { message: error?.message });
    }
}));
passport_1.default.serializeUser((user, done) => done(null, user));
passport_1.default.deserializeUser((user, done) => done(null, user));
