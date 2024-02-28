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
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../utils/response");
const user_model_1 = require("../components/v1/Users/user.model");
const auth_model_1 = require("../components/v1/Auth/auth.model");
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.decoded) {
        return (0, response_1.handleResponse)({
            res,
            message: "authentication is required",
            status: 401,
        });
    }
    const { ref, role } = req.decoded;
    try {
        const user = yield user_model_1.UserModel.findById(ref);
        if (!user) {
            return (0, response_1.handleResponse)({
                res,
                message: "authorization failed",
                status: 401,
            });
        }
        const userAuth = yield auth_model_1.AuthModel.findOne({
            User: user._id,
        });
        if (!userAuth) {
            return (0, response_1.handleResponse)({
                res,
                message: "authorization failed",
                status: 401,
            });
        }
        req.user = user;
        req.userAuth = userAuth;
        return next();
    }
    catch (err) {
        return (0, response_1.handleResponse)({
            res,
            message: "Authentication error",
            status: 401,
            err,
        });
    }
});
exports.default = requireAuth;
//# sourceMappingURL=requireAuth.js.map