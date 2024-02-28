"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterModel = exports.GetIntouchModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNo: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
const getInTouchSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNo: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.GetIntouchModel = (0, mongoose_1.model)("GetIntouch", getInTouchSchema);
const newsletterSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});
exports.NewsletterModel = (0, mongoose_1.model)("Newsletter", newsletterSchema);
//# sourceMappingURL=user.model.js.map