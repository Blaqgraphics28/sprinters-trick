import { Router, Response } from "express";
import { handleResponse } from "../../utils/response";
import userRouter from "./Users/user.routes";
import blogRouter from "./Blog/blog.routes";
import caseStudyRouter from "./caseStudy/caseStudy.routes";
import appConfig from "../../configs";
import authRouter from "./Auth/auth.routes";

const router = Router();

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/blog", blogRouter);
router.use("/case-study", caseStudyRouter);

router.get("/", (_req, res: Response) => {
  handleResponse({
    res,
    message: "Up and running in " + appConfig.environment,
  });
});

const v1Routers = router;
export default v1Routers;
