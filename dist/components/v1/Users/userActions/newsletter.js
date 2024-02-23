"use strict";
// import { Request, Response } from "express";
// import { z } from "zod";
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
const mailchimp_marketing_1 = __importDefault(require("@mailchimp/mailchimp_marketing"));
const user_model_1 = require("../user.model");
const response_1 = require("../../../../utils/response");
mailchimp_marketing_1.default.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX
});
console.log(process.env.MAILCHIMP_API_KEY, process.env.MAILCHIMP_SERVER_PREFIX);
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
        const audienceId = process.env.MAILCHIMP_AUDIENCEID;
        if (!audienceId) {
            throw new Error("MAILCHIMP_AUDIENCEID environment variable is not defined");
        }
        // Add subscriber to Mailchimp audience
        const response = yield mailchimp_marketing_1.default.lists.addListMember(audienceId, {
            email_address: email,
            status: 'subscribed',
        });
        return (0, response_1.handleResponse)({
            res,
            message: "Subscribed to newsletter successfully",
        });
    }
    catch (err) {
        (0, response_1.handleResponse)({
            res,
            status: 500,
            message: `Internal Server Error:  ${err.message}`,
        });
    }
});
exports.default = subscribeToNewsletter;
//# sourceMappingURL=newsletter.js.map