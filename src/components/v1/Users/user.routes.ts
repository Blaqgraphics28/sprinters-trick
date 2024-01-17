import { Router } from "express";
import policyMiddleware from "../../../appMiddlewares/policy.middlewares";
import {
  getIntouchSchema,
  newsletterSchema,
  blogSchema,
} from "./user.policies";
import getInTouch from "./userActions/getIntouch";
import subscribeToNewsletter from "./userActions/newsletter";
const router = Router();

router.post("/get-in-touch", policyMiddleware(getIntouchSchema), getInTouch);
router.post(
  "/subscribe",
  policyMiddleware(newsletterSchema),
  subscribeToNewsletter
);

const userRouter = router;
export default userRouter;
