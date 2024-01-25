import { NextFunction, Response } from "express";
import { IAuth } from "../components/v1/Auth/auth.model";
import platformConstants from "../configs/platformConstants";
import { IRequest } from "../types";
import { handleResponse } from "../utils/response";

type allowedRoles = (typeof platformConstants.userRole)[number];

function grantAccess(roles: allowedRoles[]) {
  return (req: IRequest, res: Response, next: NextFunction) => {
    const { userAuth } = req;

    if (roles.includes((userAuth as IAuth).role)) {
      next();
    } else {
      return handleResponse({
        res,
        status: 401,
        message: `${
          (userAuth as IAuth).role
        }s are not authorized to perform this operation`,
      });
    }
  };
}

export default grantAccess;
