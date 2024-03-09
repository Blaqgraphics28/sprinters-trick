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
exports.loginSchema = void 0;
const response_1 = require("../../../../utils/response");
const zod_1 = require("zod");
const user_model_1 = require("../../Users/user.model");
const auth_model_1 = require("../auth.model");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const existingUser = yield user_model_1.UserModel.findOne({ email });
        if (!existingUser) {
            return (0, response_1.handleResponse)({
                res,
                status: 401,
                message: "Invalid login credentials",
            });
        }
        const userAuth = yield auth_model_1.AuthModel.findOne({
            User: existingUser._id,
        });
        if (!userAuth) {
            return (0, response_1.handleResponse)({
                res,
                status: 401,
                message: "Invalid login credentials",
            });
        }
        if (!userAuth.comparePassword(password))
            return (0, response_1.handleResponse)({
                res,
                message: "Invalid login credentials",
                status: 401,
            });
        const token = userAuth.generateToken({
            data: {
                ref: existingUser._id,
                role: userAuth.role,
            },
        });
        return (0, response_1.handleResponse)({
            res,
            message: "Login successful, Welcome 🤗",
            data: {
                token,
                profile: existingUser,
            },
        });
    }
    catch (error) {
        return (0, response_1.handleResponse)({
            res,
            status: 500,
            message: `Internal Server Error:  ${error.message}`,
        });
    }
});
exports.default = login;
//# sourceMappingURL=login.js.map