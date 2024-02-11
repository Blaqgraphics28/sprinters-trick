"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const ms_1 = __importDefault(require("ms"));
const { env } = process;
const appConfig = {
    isDev: env.NODE_ENV === "",
    mongoDbUri: env.dbUri || "",
    environment: env.NODE_ENV,
    port: Number(env.PORT) || 6080,
    hashPepper: env.HASH_PEPPER,
    authConfigs: {
        saltRounds: 10,
        jwtSecret: env.JWT_SECRET || "",
        sessionLifeSpan: (0, ms_1.default)("2days"),
    },
    cloudName: env.CLOUDINARY_NAME,
    cloudinaryApiKey: env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: env.CLOUDINARY_API_SECRET,
    admin: {
        firstName: env.FIRST_NAME,
        lastName: env.LAST_NAME,
        email: env.EMAIL,
        role: env.ROLE,
        password: env.PASSWORD,
        phoneNo: env.PHONE_NO,
    },
    mailChimpApiKey: env.MAILCHIMP_API_KEY,
    mailChimpDC: env.MAILCHIMP_DC,
    mailChimpHashPepper: env.MAILCHIMP_HASHPEPPER,
    mailchimpServerPrefix: env.MAILCHIMP_SERVER_PREFIX,
};
exports.default = appConfig;
//# sourceMappingURL=index.js.map