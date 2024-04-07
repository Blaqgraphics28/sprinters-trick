"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const _1 = __importDefault(require("."));
const database_1 = require("./persistence/database");
const response_1 = require("../utils/response");
const v1Routes_1 = __importDefault(require("../components/v1/v1Routes"));
const cloudinary_1 = require("cloudinary");
const seeder_1 = __importDefault(require("./persistence/seeder"));
const app = (0, express_1.default)();
const { cloudName, cloudinaryApiKey, cloudinaryApiSecret } = _1.default;
const initializePersistenceAndSeeding = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, database_1.connectMongoDb)().catch((err) => console.log(err, "error"));
    yield (0, seeder_1.default)();
    // await sendMail().then((e) => {
    //   console.log("e  ", e);
    // });
});
const initializeMiddlewares = () => {
    const allowedOrigins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "https://sprinterstechnologies.com",
        "https://www.sprinterstechnologies.com",
        "https://sprinterz.netlify.app",
        "https://sprinterz.vercel.app",
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
        // .use(upload.any())
        .use(express_1.default.urlencoded({ extended: false }))
        .use((0, helmet_1.default)())
        .use((err, req, res, next) => {
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
            return (0, response_1.handleResponse)({
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
    })
        .use(express_1.default.json())
        .use((req, res, next) => {
        cloudinary_1.v2.config({
            cloud_name: cloudName,
            api_key: cloudinaryApiKey,
            api_secret: cloudinaryApiSecret,
        });
        next();
    });
};
const initializeRoutes = () => {
    app.use("/v1", v1Routes_1.default);
    app.get("/", (_req, res) => {
        res.json({ message: "welcome to the Sprinters!" });
    });
    app.all("*", (_req, res) => (0, response_1.handleResponse)({
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