"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogImage = exports.editBlogSchema = exports.createBlogSchema = void 0;
const zod_1 = require("zod");
exports.createBlogSchema = zod_1.z.object({
    title: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    content: zod_1.z.string(),
    description: zod_1.z.string(),
    authorName: zod_1.z.string(), //just added
});
exports.editBlogSchema = zod_1.z.object({
    description: zod_1.z.string(),
    title: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    content: zod_1.z.string(),
    authorName: zod_1.z.string(),
    imageId: zod_1.z.string(),
    blogId: zod_1.z.string()
});
exports.blogImage = zod_1.z.object({
    postImage: zod_1.z.string(),
});
//# sourceMappingURL=blog.policies.js.map