import { Router, Response } from "express";
import { handleResponse } from "../../utils/response";

const router = Router();

router.get("/", (_req, res: Response) => {
  handleResponse({
    res,
    message: "welcome to the Sprinters!",
  });
});

const v1Routers = router;
export default v1Routers;
