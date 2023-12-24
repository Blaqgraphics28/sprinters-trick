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
    hashPepper: env.HashPepper,
    authConfigs: {
        saltRounds: 10,
        jwtSecret: env.jwtSecret || "",
        sessionLifeSpan: (0, ms_1.default)("2days"),
        maxInactivity: (0, ms_1.default)("12h"),
    },
};
exports.default = appConfig;
//# sourceMappingURL=index.js.map