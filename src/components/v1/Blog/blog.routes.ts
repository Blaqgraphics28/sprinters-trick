import { Router } from "express";
import policyMiddleware from "../../../appMiddlewares/policy.middlewares";
import {  blogSchema } from "../Users/user.policies";
import { createBlog, 
         getSingleBlog,
         getAllBlogs,
         updateBlog,
        deleteBlog } from "./blogActions/blog";
const router = Router();


router.post('/', 
policyMiddleware(blogSchema), createBlog)
router.get("/all", 
policyMiddleware(blogSchema), getAllBlogs)
router.get("/:blogId", 
policyMiddleware(blogSchema), getSingleBlog
)
router.patch("/:blogId", 
policyMiddleware(blogSchema), updateBlog)
router.delete("/:blogId", 
policyMiddleware(blogSchema), deleteBlog)
 
const blogRouter = router;
export default blogRouter;