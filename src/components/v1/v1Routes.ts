import { Router, Response } from "express";
import { handleResponse } from "../../utils/response";
import userRouter from "./Users/user.routes";

const router = Router();

router.use("/users", userRouter);
router.get("/", (_req, res: Response) => {
  handleResponse({
    res,
    message: "welcome to the Sprinters!",
  });
});

const v1Routers = router;
export default v1Routers;
