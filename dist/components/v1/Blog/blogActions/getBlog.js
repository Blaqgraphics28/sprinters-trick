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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlog = void 0;
const zod_1 = require("zod");
const response_1 = require("../../../../utils/response");
const blog_model_1 = require("../blog.model");
const getBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogIdSchema = zod_1.z.object({ blog_id: zod_1.z.string().optional() });
    const { blog_id } = blogIdSchema.parse(req.query);
    let Blog;
    try {
        if (blog_id) {
            Blog = yield blog_model_1.BlogModel.findOne({ _id: blog_id });
            if (!Blog)
                return (0, response_1.handleResponse)({ res, status: 400, message: "Blog not found" });
            return (0, response_1.handleResponse)({
                res,
                message: "success",
                data: Blog,
            });
        }
        Blog = yield blog_model_1.BlogModel.find();
        return (0, response_1.handleResponse)({
            res,
            message: "success",
            data: Blog,
        });
    }
    catch (err) {
        return (0, response_1.handleResponse)({
            res,
            err,
            status: 500,
            message: `Internal server error:  ${err.message}`,
        });
    }
});
exports.getBlog = getBlog;
//# sourceMappingURL=getBlog.js.map