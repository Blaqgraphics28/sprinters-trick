import { NextFunction, Response } from "express";
import { IAuth } from "../../src/components/v1/Auth/auth.model";
import platformConstants from "../../src/configs/platformConstants";
import { IRequest } from "../../src/types";
import { handleResponse } from "../../src/utils/response";

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
