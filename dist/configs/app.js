"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const _1 = __importDefault(require("."));
const database_1 = require("./persistence/database");
const helpers_1 = require("../utils/helpers");
const v1Routes_1 = __importDefault(require("../components/v1/v1Routes"));
const app = (0, express_1.default)();
const initializePersistenceAndSeeding = () => {
    (0, database_1.connectMongoDb)().catch((err) => console.log(err, "error"));
};
const initializeMiddlewares = () => {
    const allowedOrigins = [
        `http://localhost:${_1.default.port}`,
        `http://127.0.0.1:${_1.default.port}`,
    ];
    const corsOptions = {
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    };
    app
        .use((0, cors_1.default)(corsOptions))
        .use(express_1.default.json({ limit: "50kb" }))
        .use(express_1.default.urlencoded({ limit: "50kb", extended: false }))
        .use((0, helmet_1.default)())
        .use((err, req, res, next) => {
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
            return (0, helpers_1.handleResponse)({
                res,
                status: 403,
                message: "Invalid header method",
            });
        }
        if (req.body && err instanceof SyntaxError) {
            return res.status(400).json({
                message: "Malformed JSON, check the body of the request",
            });
        }
        return next();
    });
};
const initializeRoutes = () => {
    app.use("/v1", v1Routes_1.default);
    app.get("/", (_req, res) => {
        res.json({ message: "Up and running in " + _1.default.environment });
    });
    app.all("*", (_req, res) => (0, helpers_1.handleResponse)({
        res,
        status: 404,
        message: "You have used an invalid method or hit an invalid route",
    }));
};
initializePersistenceAndSeeding();
initializeMiddlewares();
initializeRoutes();
exports.default = app;
//# sourceMappingURL=app.js.map