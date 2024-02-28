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
const response_1 = require("../../../../utils/response");
const user_model_1 = require("../user.model");
const getInTouch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, phoneNo, message, } = req.body;
    try {
        const getInTouch = yield new user_model_1.GetIntouchModel({
            firstName,
            lastName,
            email,
            phoneNo,
            message,
        }).save();
        //TODO: send mail
        return (0, response_1.handleResponse)({
            res,
            message: "message sent successfully",
            data: getInTouch,
        });
    }
    catch (err) {
        return (0, response_1.handleResponse)({
            res,
            err,
            status: 500,
            message: `Internal server error:  ${err.message}`,
        });
    }
});
exports.default = getInTouch;
//# sourceMappingURL=getIntouch.js.map