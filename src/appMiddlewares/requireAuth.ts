import { NextFunction, Response } from "express";

import { IRequest } from "../types";
import { handleResponse } from "../utils/response";
import { UserModel } from "../components/v1/Users/user.model";
import { AuthModel } from "../components/v1/Auth/auth.model";

const requireAuth = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.decoded) {
    return handleResponse({
      res,
      message: "authentication is required",
      status: 401,
    });
  }

  const { ref, role } = req.decoded;

  try {
    const user = await UserModel.findById(ref);
    if (!user) {
      return handleResponse({
        res,
        message: "authorization failed",
        status: 401,
      });
    }

    const userAuth = await AuthModel.findOne({
      User: user._id,
    });
    if (!userAuth) {
      return handleResponse({
        res,
        message: "authorization failed",
        status: 401,
      });
    }

    req.user = user;
    req.userAuth = userAuth;

    return next();
  } catch (err) {
    return handleResponse({
      res,
      message: "Authentication error",
      status: 401,
      err,
    });
  }
};
export default requireAuth;
