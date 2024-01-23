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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_model_1 = require("../../components/v1/Users/user.model");
const __1 = __importDefault(require(".."));
const auth_model_1 = require("../../components/v1/Auth/auth.model");
const seeding = () => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    session.startTransaction();
    const { admin } = __1.default;
    try {
        const userExist = yield user_model_1.UserModel.findOne().session(session);
        if (userExist) {
            yield session.abortTransaction();
            session.endSession();
            return;
        }
        console.log("seeding now......");
        const user = yield new user_model_1.UserModel({
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
        }).save({ session });
        yield new auth_model_1.AuthModel({
            User: user._id,
            password: admin.password,
            role: admin.role,
        }).save({ session });
        yield session.commitTransaction();
        session.endSession();
        console.log("Seeding complete ✅");
    }
    catch (err) {
        yield session.abortTransaction();
        session.endSession();
        console.log("error seeding data to DB " + err);
    }
});
exports.default = seeding;
//# sourceMappingURL=seeder.js.map