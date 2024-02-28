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
const response_1 = require("../../../../utils/response");
const caseStudy_model_1 = __importDefault(require("../caseStudy.model"));
const getCaseStudy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { caseStudyId } = req.query;
    let caseStudy;
    try {
        if (caseStudyId) {
            caseStudy = yield caseStudy_model_1.default.findOne({ _id: String(caseStudyId) });
            if (!caseStudy)
                return (0, response_1.handleResponse)({
                    res,
                    message: "case study not found",
                    status: 400,
                });
            const otherCasestudy = yield caseStudy_model_1.default.find({ _id: { $ne: caseStudyId } });
            return (0, response_1.handleResponse)({
                res,
                message: "Success",
                data: { caseStudy, otherCasestudy },
            });
        }
        caseStudy = yield caseStudy_model_1.default.find();
        return (0, response_1.handleResponse)({
            res,
            message: "Success",
            data: caseStudy,
        });
    }
    catch (err) {
        return (0, response_1.handleResponse)({
            res,
            err,
            status: 500,
            message: `Internal Server Error:  ${err.message}`,
        });
    }
});
exports.default = getCaseStudy;
//# sourceMappingURL=getCaseStudy.js.map