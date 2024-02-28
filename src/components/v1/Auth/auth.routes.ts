import { Router } from "express";
import login, { loginSchema } from "./authActions/login";
import policyMiddleware from "../../../appMiddlewares/policy.middlewares";

const router = Router();

router.post("/login", policyMiddleware(loginSchema), login);

const authRouter = router;
export default authRouter;
