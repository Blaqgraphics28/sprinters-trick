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
exports.getSingleBlog = void 0;
const response_1 = require("../../../../utils/response");
const blog_model_1 = require("../blog.model");
const getSingleBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    try {
        const blog = yield blog_model_1.BlogModel.findById(blogId);
        if (!blog) {
            return (0, response_1.handleResponse)({
                res,
                status: 404,
                message: "Blog not found",
            });
        }
        return (0, response_1.handleResponse)({
            res,
            message: "Blog retrieved successfully",
            data: blog,
        });
    }
    catch (err) {
        console.error(err);
        return (0, response_1.handleResponse)({
            res,
            err,
            status: 500,
            message: `Internal server error: ${err.message}`,
        });
    }
});
exports.getSingleBlog = getSingleBlog;
//# sourceMappingURL=getSingle.Blog.js.map