"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPhoneNo = void 0;
const phone_1 = __importDefault(require("phone"));
const isValidPhoneNo = (phoneNo) => (0, phone_1.default)(phoneNo).isValid;
exports.isValidPhoneNo = isValidPhoneNo;
//# sourceMappingURL=helpers.js.map