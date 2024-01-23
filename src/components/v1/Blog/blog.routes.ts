import { Router } from "express";

import policyMiddleware from "../../../appMiddlewares/policy.middlewares";
import { deleteBlog } from "./blogActions/delete.Blog";
import { upload } from "../../../configs/fileUplod.config";
import { uploadImage } from "./blogActions/uploadImage";
import { getBlog } from "./blogActions/getBlog";
import { createBlogSchema } from "./blog.policies";
import createBlog from "./blogActions/create.Blog";
const router = Router();

router.post("/", policyMiddleware(createBlogSchema), createBlog);
router.get("/", getBlog);
// router.patch("/:blogId", policyMiddleware(blogSchema), updateBlog);
router.delete("/:blogId", deleteBlog);
router.post("/upload/image", upload.single("blogImage"), uploadImage);

const blogRouter = router;
export default blogRouter;
