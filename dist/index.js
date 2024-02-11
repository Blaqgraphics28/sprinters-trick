"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./configs/app"));
const configs_1 = __importDefault(require("./configs"));
const { port, environment } = configs_1.default;
const server = http_1.default.createServer(app_1.default);
const createServer = (port) => {
    server.listen(port);
    server.on("listening", () => {
        console.log(`${environment === null || environment === void 0 ? void 0 : environment.toLocaleUpperCase()} is running on port ${port}`);
    });
    server.on("error", (error) => {
        console.log("server error");
        throw error;
    });
};
createServer(port);
//# sourceMappingURL=index.js.map