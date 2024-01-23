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
const createCaseStudy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectTitle, projectSubtitle, projectDescription, projectOverview, problem, solution, clientName, projectTimeline, projectCategory, servicesProvides, coverPhoto, } = req.body;
    try {
        const caseStudy = yield new caseStudy_model_1.default({
            projectTitle,
            projectSubtitle,
            projectDescription,
            projectOverview,
            problem,
            solution,
            clientName,
            projectTimeline,
            projectCategory,
            servicesProvides,
            coverPhoto,
        }).save();
        return (0, response_1.handleResponse)({
            res,
            status: 201,
            message: "caseStudy created successfully",
            data: caseStudy,
        });
    }
    catch (err) {
        return (0, response_1.handleResponse)({
            res,
            err,
            status: 500,
            message: "Internal server error: ${err.message}",
        });
    }
});
exports.default = createCaseStudy;
//# sourceMappingURL=createCaseStudy.js.map