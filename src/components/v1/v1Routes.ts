import { Router, Response } from "express";
import { handleResponse } from "../../utils/response";
import userRouter from "./Users/user.routes";
import appConfig from "../../configs";

const router = Router();

router.use("/users", userRouter);
router.get("/", (_req, res: Response) => {
  handleResponse({
    res,
    message: "Up and running in " + appConfig.environment,
  });
});

const v1Routers = router;
export default v1Routers;
