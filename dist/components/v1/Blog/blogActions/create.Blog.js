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
exports.createBlog = void 0;
const response_1 = require("../../../../utils/response");
const blog_model_1 = require("../blog.model");
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogDescription, blogTitle, blogTags, imageUrl, authorImage, authorName, } = req.body;
    try {
        const blog = yield new blog_model_1.BlogModel({
            blogDescription,
            blogTitle,
            blogTags,
            imageUrl,
            authorImage,
            authorName,
        }).save();
        return (0, response_1.handleResponse)({
            res,
            status: 201,
            message: "blog created successfully",
            data: blog,
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
exports.createBlog = createBlog;
//# sourceMappingURL=create.Blog.js.map