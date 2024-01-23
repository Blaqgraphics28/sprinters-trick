"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const policy_middlewares_1 = __importDefault(require("../../../appMiddlewares/policy.middlewares"));
const user_policies_1 = require("../Users/user.policies");
const create_Blog_1 = require("./blogActions/create.Blog");
const getAll_Blog_1 = require("./blogActions/getAll.Blog");
const getSingle_Blog_1 = require("./blogActions/getSingle.Blog");
const update_Blog_1 = require("./blogActions/update.Blog");
const delete_Blog_1 = require("./blogActions/delete.Blog");
const post_image_blog_1 = require("./blogActions/post-image.blog");
const router = (0, express_1.Router)();
router.post("/post-image", post_image_blog_1.uploadPostImage);
router.post("/", (0, policy_middlewares_1.default)(user_policies_1.blogSchema), create_Blog_1.createBlog);
router.get("/all", getAll_Blog_1.getAllBlogs);
router.get("/:blogId", getSingle_Blog_1.getSingleBlog);
router.patch("/:blogId", (0, policy_middlewares_1.default)(user_policies_1.blogSchema), update_Blog_1.updateBlog);
router.delete("/:blogId", delete_Blog_1.deleteBlog);
const blogRouter = router;
exports.default = blogRouter;
//# sourceMappingURL=blog.routes.js.map