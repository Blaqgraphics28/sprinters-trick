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
const caseStudy_model_1 = __importDefault(require("../caseStudy.model"));
const response_1 = require("../../../../utils/response");
const cloudinary_1 = require("cloudinary");
const deleteCaseStudy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { caseStudyId, imageId } = req.params;
    try {
        if (!imageId)
            return (0, response_1.handleResponse)({
                res,
                message: "please provide image id",
            });
        const ImageId = imageId.replace("sprinters/", "");
        yield cloudinary_1.v2.uploader.destroy(ImageId, {
            resource_type: "image",
        });
        const deleteCaseStudy = yield caseStudy_model_1.default.findByIdAndDelete(caseStudyId);
        if (!deleteCaseStudy) {
            return (0, response_1.handleResponse)({
                res,
                status: 400,
                message: "case study not found",
            });
        }
        return (0, response_1.handleResponse)({
            res,
            status: 200,
            message: "caseStudy deleted successfully",
        });
    }
    catch (err) {
        console.error(err);
        return (0, response_1.handleResponse)({
            res,
            err,
            status: 500,
            message: `Internal Server Error:  ${err.message}`,
        });
    }
});
exports.default = deleteCaseStudy;
//# sourceMappingURL=deleteCaseStudy.js.map