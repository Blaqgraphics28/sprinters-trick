import { Router } from "express";
import createCaseStudy from "./caseStudyActions/createCaseStudy";
import { createCaseStudySchema } from "./caseStudy.policies";
import policyMiddleware from "src/appMiddlewares/policy.middlewares";
import getCaseStudy from "./caseStudyActions/getCaseStudy";
import deleteCaseStudy from "./caseStudyActions/deleteCaseStudy";

const router = Router();

router.post("/", policyMiddleware(createCaseStudySchema), createCaseStudy);
router.get("/", getCaseStudy);
router.delete("/:caseStudyId", deleteCaseStudy);

const caseStudyRouter = router;
export default caseStudyRouter;
