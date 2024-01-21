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
const user_model_1 = require("../user.model");
const response_1 = require("../../../../utils/response");
const subscribeToNewsletter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const existingEmail = yield user_model_1.NewsletterModel.findOne({ email });
        if (existingEmail) {
            return (0, response_1.handleResponse)({
                res,
                status: 409,
                message: "Email already subscribed",
            });
        }
        yield new user_model_1.NewsletterModel({ email }).save();
        return (0, response_1.handleResponse)({
            res,
            message: "successfully",
        });
    }
    catch (error) {
        (0, response_1.handleResponse)({
            res,
            status: 500,
            message: "Internal Server Error",
        });
    }
});
exports.default = subscribeToNewsletter;
//# sourceMappingURL=newsletter.js.map