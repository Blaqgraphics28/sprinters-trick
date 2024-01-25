"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const response_1 = require("../../utils/response");
const user_routes_1 = __importDefault(require("./Users/user.routes"));
const blog_routes_1 = __importDefault(require("./Blog/blog.routes"));
const caseStudy_routes_1 = __importDefault(require("./caseStudy/caseStudy.routes"));
const configs_1 = __importDefault(require("../../configs"));
const auth_routes_1 = __importDefault(require("./Auth/auth.routes"));
const router = (0, express_1.Router)();
router.use("/users", user_routes_1.default);
router.use("/auth", auth_routes_1.default);
router.use("/blog", blog_routes_1.default);
router.use("/case-study", caseStudy_routes_1.default);
router.get("/", (_req, res) => {
    (0, response_1.handleResponse)({
        res,
        message: "Up and running in " + configs_1.default.environment,
    });
});
const v1Routers = router;
exports.default = v1Routers;
//# sourceMappingURL=v1Routes.js.map