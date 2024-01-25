"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const policy_middlewares_1 = __importDefault(require("../../../appMiddlewares/policy.middlewares"));
const delete_Blog_1 = require("./blogActions/delete.Blog");
const fileUpload_config_1 = require("../../../configs/fileUpload.config");
const uploadImage_1 = require("../upload/uploadImage");
const getBlog_1 = require("./blogActions/getBlog");
const blog_policies_1 = require("./blog.policies");
const create_Blog_1 = __importDefault(require("./blogActions/create.Blog"));
const validateToken_1 = __importDefault(require("../../../appMiddlewares/validateToken"));
const requireAuth_1 = __importDefault(require("../../../appMiddlewares/requireAuth"));
const hasPermission_1 = __importDefault(require("../../../appMiddlewares/hasPermission"));
const edit_Blog_1 = __importDefault(require("./blogActions/edit.Blog"));
const router = (0, express_1.Router)();
router.post("/", (0, policy_middlewares_1.default)(blog_policies_1.createBlogSchema), validateToken_1.default, requireAuth_1.default, (0, hasPermission_1.default)(["admin"]), create_Blog_1.default);
router.get("/", getBlog_1.getBlog);
router.patch("/update/:blogId", (0, policy_middlewares_1.default)(blog_policies_1.createBlogSchema), validateToken_1.default, requireAuth_1.default, (0, hasPermission_1.default)(["admin"]), edit_Blog_1.default);
router.delete("/:blogId", validateToken_1.default, requireAuth_1.default, (0, hasPermission_1.default)(["admin"]), delete_Blog_1.deleteBlog);
router.post("/upload/image", validateToken_1.default, requireAuth_1.default, (0, hasPermission_1.default)(["admin"]), fileUpload_config_1.upload.single("blogImage"), uploadImage_1.uploadImage);
const blogRouter = router;
exports.default = blogRouter;
//# sourceMappingURL=blog.routes.js.map