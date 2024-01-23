"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const policy_middlewares_1 = __importDefault(require("../../../appMiddlewares/policy.middlewares"));
const delete_Blog_1 = require("./blogActions/delete.Blog");
const fileUplod_config_1 = require("../../../configs/fileUplod.config");
const uploadImage_1 = require("../upload/uploadImage");
const getBlog_1 = require("./blogActions/getBlog");
const blog_policies_1 = require("./blog.policies");
const create_Blog_1 = __importDefault(require("./blogActions/create.Blog"));
const router = (0, express_1.Router)();
router.post("/", (0, policy_middlewares_1.default)(blog_policies_1.createBlogSchema), create_Blog_1.default);
router.get("/", getBlog_1.getBlog);
// router.patch("/:blogId", policyMiddleware(blogSchema), updateBlog);
router.delete("/:blogId", delete_Blog_1.deleteBlog);
router.post("/upload/image", fileUplod_config_1.upload.single("blogImage"), uploadImage_1.uploadImage);
const blogRouter = router;
exports.default = blogRouter;
//# sourceMappingURL=blog.routes.js.map