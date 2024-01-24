import { Router } from "express";
import createCaseStudy from "./caseStudyActions/createCaseStudy";
import { createCaseStudySchema } from "./caseStudy.policies";
import policyMiddleware from "../../../appMiddlewares/policy.middlewares";
import getCaseStudy from "./caseStudyActions/getCaseStudy";
import deleteCaseStudy from "./caseStudyActions/deleteCaseStudy";
import { upload } from "../../../configs/fileUpload.config";
import { uploadImage } from "../upload/uploadImage";
import validateToken from "../../../appMiddlewares/validateToken";
import requireAuth from "../../../appMiddlewares/requireAuth";
import grantAccess from "../../../appMiddlewares/hasPermission";
import editCaseStudy from "./caseStudyActions/editCaseStudy";

const router = Router();

router.post(
  "/",
  policyMiddleware(createCaseStudySchema),
  validateToken,
  requireAuth,
  grantAccess(["admin"]),
  createCaseStudy
);
router.get("/", getCaseStudy);
router.patch(
  "/update/:id",
  policyMiddleware(createCaseStudySchema),
  validateToken,
  requireAuth,
  grantAccess(["admin"]),
  editCaseStudy
);
router.delete(
  "/:caseStudyId",
  validateToken,
  requireAuth,
  grantAccess(["admin"]),
  deleteCaseStudy
);
router.post(
  "/upload/image",
  validateToken,
  requireAuth,
  grantAccess(["admin"]),
  upload.single("cover-photo"),
  uploadImage
);

const caseStudyRouter = router;
export default caseStudyRouter;
