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
const zod_1 = require("zod");
const caseStudy_model_1 = __importDefault(require("../caseStudy.model"));
const editCaseStudy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectTitle, projectSubtitle, projectDescription, projectOverview, problem, solution, clientName, projectTimeline, projectCategory, servicesProvides, coverPhoto, } = req.body;
    const Id = zod_1.z.object({ id: zod_1.z.string().optional() });
    const { id } = req.params;
    let caseStudy;
    try {
        caseStudy = yield caseStudy_model_1.default.findById(id);
        if (!caseStudy)
            return (0, response_1.handleResponse)({
                res,
                status: 400,
                message: "case study not found",
            });
        caseStudy = yield caseStudy_model_1.default.findByIdAndUpdate(id, {
            $set: {
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
            },
            new: true,
        });
        return (0, response_1.handleResponse)({
            res,
            message: "case study edited successfully",
            data: caseStudy,
        });
    }
    catch (error) {
        return (0, response_1.handleResponse)({
            res,
            status: 500,
            message: `Internal Server Error: ${error.message}`,
        });
    }
});
exports.default = editCaseStudy;
//# sourceMappingURL=editCaseStudy.js.map