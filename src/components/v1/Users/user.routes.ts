import { Router } from "express";
import policyMiddleware from "../../../appMiddlewares/policy.middlewares";
import { getIntouchSchema } from "./user.policies";
import getInTouch from "./userActions/getIntouch";

const router = Router();

router.post("/get-in-touch", policyMiddleware(getIntouchSchema), getInTouch);

const userRouter = router;
export default userRouter;
