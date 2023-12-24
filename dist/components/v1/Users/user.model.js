"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const platformConstants_1 = __importDefault(require("../../../configs/platformConstants"));
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, "please enter your first name"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "please enter your last name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        unique: true,
    },
    phoneNo: {
        type: String,
        required: [true, "please enter your phone number"],
    },
    message: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "visitor",
        enum: platformConstants_1.default.userRole
    }
}, { timestamps: true });
const UserModel = mongoose_1.default.model("UserModel", userSchema);
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map