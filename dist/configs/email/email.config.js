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
const __1 = __importDefault(require(".."));
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { mailChimpApiKey, mailchimpServerPrefix, mailChimpDC, mailChimpHashPepper, } = __1.default;
function sendMail() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            mailchimp.setConfig({
                apiKey: mailChimpApiKey,
                server: mailchimpServerPrefix,
            });
            const response = yield mailchimp.ping.get();
            return response;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.default = sendMail;
function createAudience() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const audience = yield mailchimp.lists.createList({
                name: "Amidst",
                contact: {
                    company: "company",
                    address1: "address",
                    city: "city",
                    state: "state",
                    zip: "zip",
                    country: "country",
                },
                permission_reminder: "*|LIST:DESCRIPTION|*",
                email_type_option: true,
                campaign_defaults: {
                    from_name: "from_name",
                    from_email: "from_email",
                    subject: "subject",
                    language: "language",
                },
            });
            return `Successfully created an audience. The audience id is ${audience.id}.`;
        }
        catch (err) {
            throw err;
        }
    });
}
const addListMember = (listId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield mailchimp.lists.addListMember(listId, {
            email_address: "email@ghmail.com",
            status: "subscribed",
            email_type: "html",
            merge_fields: {
                FNAME: "firstname",
                LNAME: "lastname",
            },
            tags: ["customer"],
        });
        return `Successfully added contact as an audience member. The contact's id is ${response.id}.`;
    }
    catch (err) {
        throw err;
    }
});
//Grouping the audiences
const createSegment = (listId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield mailchimp.lists.createSegment(listId, {
            name: "Newsletter",
            options: {
                match: "any",
                conditions: [
                    { field: "EMAIL", op: "contains", value: "SRETsd@email.com" },
                ],
            },
        });
        return response;
    }
    catch (err) {
        throw err;
    }
});
//# sourceMappingURL=email.config.js.map