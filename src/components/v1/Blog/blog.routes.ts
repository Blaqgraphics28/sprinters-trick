import { Router } from "express";
import policyMiddleware from "../../../appMiddlewares/policy.middlewares";
import { blogSchema } from "../Users/user.policies";
import { createBlog } from "./blogActions/create.Blog";
import { getAllBlogs } from "./blogActions/getAll.Blog";
import { getSingleBlog } from "./blogActions/getSingle.Blog";
import { updateBlog } from "./blogActions/update.Blog";
import { deleteBlog } from "./blogActions/delete.Blog";
import { uploadPostImage} from "./blogActions/post-image.blog";
import { blogImage } from "../Users/user.policies";
const router = Router();


router.post("/post-image",  uploadPostImage)
router.post("/", policyMiddleware(blogSchema), createBlog);
router.get("/all",  getAllBlogs);
router.get("/:blogId",  getSingleBlog);
router.patch("/:blogId", policyMiddleware(blogSchema), updateBlog);
router.delete("/:blogId", deleteBlog);

const blogRouter = router;
export default blogRouter;
