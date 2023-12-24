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
exports.abortSessionWithResponse = exports.commitSessionWithResponse = exports.handleResponse = void 0;
const configs_1 = __importDefault(require("../configs"));
const handleResponse = ({ res, data, status = 200, err, message, }) => {
    if (err && configs_1.default.isDev)
        console.log(err);
    if (status >= 400) {
        if (err && err.name && err.name === "MongoError") {
            if (err.code === 11000)
                return res.status(400).json({
                    message: "duplicate detected",
                });
        }
    }
    return res.status(status).json({
        message,
        data,
    });
};
exports.handleResponse = handleResponse;
const commitSessionWithResponse = ({ res, data, status = 200, message, session, err = null, }) => __awaiter(void 0, void 0, void 0, function* () {
    yield session.commitTransaction();
    session.endSession();
    return (0, exports.handleResponse)({ res, data, status, message, err });
});
exports.commitSessionWithResponse = commitSessionWithResponse;
const abortSessionWithResponse = ({ res, data, status = 200, err = null, message, session, }) => __awaiter(void 0, void 0, void 0, function* () {
    yield session.abortTransaction();
    session.endSession();
    return (0, exports.handleResponse)({ res, data, status, message, err });
});
exports.abortSessionWithResponse = abortSessionWithResponse;
//# sourceMappingURL=helpers.js.map