"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const policy_middlewares_1 = __importDefault(require("../../../appMiddlewares/policy.middlewares"));
const user_policies_1 = require("./user.policies");
const getIntouch_1 = __importDefault(require("./userActions/getIntouch"));
const router = (0, express_1.Router)();
router.post("/get-in-touch", (0, policy_middlewares_1.default)(user_policies_1.getIntouchSchema), getIntouch_1.default);
const userRouter = router;
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map