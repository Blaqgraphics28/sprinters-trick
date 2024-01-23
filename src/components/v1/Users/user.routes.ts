import { Router } from "express";
import policyMiddleware from "../../../appMiddlewares/policy.middlewares";
import { getIntouchSchema, newsletterSchema } from "./user.policies";
import subscribeToNewsletter from "./userActions/newsletter";
import getInTouch from "./userActions/getIntouch";

const router = Router();

router.post("/get-in-touch", policyMiddleware(getIntouchSchema), getInTouch);
router.post(
  "/subscribe",
  policyMiddleware(newsletterSchema),
  subscribeToNewsletter
);



const userRouter = router;
export default userRouter;
