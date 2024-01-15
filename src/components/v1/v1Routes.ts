import { Router, Response } from "express";
import { handleResponse } from "../../utils/response";
import userRouter from "./Users/user.routes";
import blogRouter from "./Users/blog.routes";
import appConfig from "../../configs";

const router = Router();

router.use("/users", userRouter);
router.use("/blog", blogRouter)
router.get("/", (_req, res: Response) => {
  handleResponse({
    res,
    message: "Up and running in " + appConfig.environment,
  });
});

const v2Routers = router;
export default v2Routers;
