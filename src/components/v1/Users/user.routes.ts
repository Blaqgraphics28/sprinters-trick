import { Router } from "express";
import policyMiddleware from "../../../appMiddlewares/policy.middlewares";
import { getIntouchSchema, newsletterSchema, caseStudyschema } from "./user.policies";
import getInTouch from "./userActions/getIntouch";
import subscribeToNewsletter from "./userActions/newsletter";
import { getSinglecaseStudy, getAllcaseStudy, updatecaseStudy, deletecaseStudy } from "./userActions/casestudy";
import { createcaseStudy } from "./userActions/createcasestudy";

const router = Router();

router.post("/get-in-touch", policyMiddleware(getIntouchSchema), getInTouch);
router.post(
  "/subscribe",
  policyMiddleware(newsletterSchema),
  subscribeToNewsletter
);
router.post("/", policyMiddleware(caseStudyschema), createcaseStudy);
router.post("/all", policyMiddleware(caseStudyschema), getAllcaseStudy);
router.post("/:caseStudyId", policyMiddleware(caseStudyschema), getSinglecaseStudy);
router.post("/:caseStudyId", policyMiddleware(caseStudyschema), updatecaseStudy);
router.post("/:caseStudyId", policyMiddleware(caseStudyschema), deletecaseStudy);

const userRouter = router;
export default userRouter;
