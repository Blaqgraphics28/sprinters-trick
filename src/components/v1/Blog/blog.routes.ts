import { Router } from "express";

import policyMiddleware from "../../../appMiddlewares/policy.middlewares";
import { deleteBlog } from "./blogActions/delete.Blog";
import { upload } from "../../../configs/fileUpload.config";
import { uploadImage } from "../upload/uploadImage";
import { getBlog } from "./blogActions/getBlog";
import { createBlogSchema } from "./blog.policies";
import createBlog from "./blogActions/create.Blog";
import validateToken from "../../../appMiddlewares/validateToken";
import requireAuth from "../../../appMiddlewares/requireAuth";
import grantAccess from "../../../appMiddlewares/hasPermission";
import editBlog from "./blogActions/edit.Blog";
const router = Router();

router.post(
  "/",
  policyMiddleware(createBlogSchema),
  validateToken,
  requireAuth,
  grantAccess(["admin"]),
  createBlog
);
router.get("/", getBlog);
router.patch(
  "/update/:blogId",
  policyMiddleware(createBlogSchema),
  validateToken,
  requireAuth,
  grantAccess(["admin"]),
  editBlog
);
router.delete(
  "/:blogId",
  validateToken,
  requireAuth,
  grantAccess(["admin"]),
  deleteBlog
);
router.post(
  "/upload/image",
  validateToken,
  requireAuth,
  grantAccess(["admin"]),
  upload.single("blogImage"),
  uploadImage
);

const blogRouter = router;
export default blogRouter;
