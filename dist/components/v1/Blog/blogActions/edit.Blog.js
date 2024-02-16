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
const response_1 = require("../../../../utils/response");
const blog_model_1 = require("../blog.model");
const editBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, title, tags, content, blogId, } = req.body;
    const { imageDetails } = req;
    try {
        if (!blogId)
            return (0, response_1.handleResponse)({
                res,
                status: 400,
                message: "please, provide blog Id",
            });
        const updatedBlog = yield blog_model_1.BlogModel.findByIdAndUpdate(blogId, {
            $set: {
                description,
                title,
                image: imageDetails,
                tags,
                content,
            },
        }, { new: true });
        if (!updatedBlog) {
            return (0, response_1.handleResponse)({
                res,
                status: 404,
                message: "Blog not found",
            });
        }
        return (0, response_1.handleResponse)({
            res,
            status: 200,
            message: "Blog updated successfully",
            data: updatedBlog,
        });
    }
    catch (err) {
        return (0, response_1.handleResponse)({
            res,
            err,
            status: 500,
            message: `Internal server error: ${err.message}`,
        });
    }
});
exports.default = editBlog;
//# sourceMappingURL=edit.Blog.js.map