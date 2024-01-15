import { Router } from "express";
import policyMiddleware from "../../../appMiddlewares/policy.middlewares";
import {  blogSchema } from "./user.policies";
import { createBlog, 
         getSingleBlog,
         getAllBlogs,
         updateBlog,
        deleteBlog } from "./userActions/blog";
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
router.patch("/:blogId", 
policyMiddleware(blogSchema), updateBlog)
 
const blogRouter = router;
export default blogRouter;
