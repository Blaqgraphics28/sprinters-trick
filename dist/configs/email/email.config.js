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
const axios_1 = __importDefault(require("axios"));
const __1 = __importDefault(require(".."));
function sendMail() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { mailChimpApiKey, mailChimpDC, mailChimpHashPepper } = __1.default;
            const authString = `${mailChimpHashPepper}:${mailChimpApiKey}`;
            const apiUrl = `https://${mailChimpDC}.api.mailchimp.com/3.0/ping`;
            const { data } = yield axios_1.default.get(apiUrl, {
                auth: {
                    username: String(mailChimpHashPepper),
                    password: String(mailChimpApiKey),
                },
            });
            return data;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.default = sendMail;
//# sourceMappingURL=email.config.js.map