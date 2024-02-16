import { Router } from "express";
import createCaseStudy from "./caseStudyActions/createCaseStudy";
import {
  createCaseStudySchema,
  editCaseStudySchema,
} from "./caseStudy.policies";
import policyMiddleware from "../../../appMiddlewares/policy.middlewares";
import getCaseStudy from "./caseStudyActions/getCaseStudy";
import deleteCaseStudy from "./caseStudyActions/deleteCaseStudy";
import { upload } from "../../../configs/fileUpload.config";
import validateToken from "../../../appMiddlewares/validateToken";
import requireAuth from "../../../appMiddlewares/requireAuth";
import grantAccess from "../../../appMiddlewares/hasPermission";
import editCaseStudy from "./caseStudyActions/editCaseStudy";
import { uploadImageMiddleware } from "../../../appMiddlewares/imgeUpload";

const router = Router();

router.post(
  "/",
  upload.single("cover_photo"),
  policyMiddleware(createCaseStudySchema),
  validateToken,
  requireAuth,
  grantAccess(["admin"]),
  uploadImageMiddleware,
  createCaseStudy
);
router.get("/", getCaseStudy);
router.patch(
  "/update",
  upload.single("cover_photo"),
  policyMiddleware(editCaseStudySchema),
  validateToken,
  requireAuth,
  grantAccess(["admin"]),
  uploadImageMiddleware,
  editCaseStudy
);
router.delete(
  "/",
  validateToken,
  requireAuth,
  grantAccess(["admin"]),
  deleteCaseStudy
);

const caseStudyRouter = router;
export default caseStudyRouter;
