import { Router } from "express";
import createCaseStudy from "./caseStudyActions/createCaseStudy";
import { createCaseStudySchema } from "./caseStudy.policies";
import policyMiddleware from "../../../appMiddlewares/policy.middlewares";
import getCaseStudy from "./caseStudyActions/getCaseStudy";
import deleteCaseStudy from "./caseStudyActions/deleteCaseStudy";
import { upload } from "../../../configs/fileUplod.config";
import { uploadImage } from "../upload/uploadImage";

const router = Router();

router.post("/", policyMiddleware(createCaseStudySchema), createCaseStudy);
router.get("/", getCaseStudy);
router.delete("/:caseStudyId", deleteCaseStudy);
router.post("/upload/image", upload.single("cover-photo"), uploadImage);

const caseStudyRouter = router;
export default caseStudyRouter;
