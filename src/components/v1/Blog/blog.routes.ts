import { Router } from "express";

import policyMiddleware from "../../../appMiddlewares/policy.middlewares";
import { deleteBlog } from "./blogActions/delete.Blog";
import { upload } from "../../../configs/fileUpload.config";
import { getBlog } from "./blogActions/getBlog";
import { createBlogSchema, editBlogSchema } from "./blog.policies";
import createBlog from "./blogActions/create.Blog";
import validateToken from "../../../appMiddlewares/validateToken";
import requireAuth from "../../../appMiddlewares/requireAuth";
import grantAccess from "../../../appMiddlewares/hasPermission";
import editBlog from "./blogActions/edit.Blog";
import { uploadImageMiddleware } from "../../../appMiddlewares/imgeUpload";
const router = Router();

router.post(
  "/",
  upload.single("blog_image"),
  policyMiddleware(createBlogSchema),
  validateToken,
  requireAuth,
  grantAccess(["admin"]),
  uploadImageMiddleware,
  createBlog
);
router.get("/", getBlog);
router.patch(
  "/update",
  upload.single("blog_image"),
  policyMiddleware(editBlogSchema),
  validateToken,
  requireAuth,
  grantAccess(["admin"]),
  uploadImageMiddleware,
  editBlog
);
router.delete(
  "/",
  validateToken,
  requireAuth,
  grantAccess(["admin"]),
  deleteBlog
);

const blogRouter = router;
export default blogRouter;
