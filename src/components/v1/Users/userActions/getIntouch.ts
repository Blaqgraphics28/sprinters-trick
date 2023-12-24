import { Response } from "express";
import { IReq } from "../../../../types";
import { z } from "zod";
import { getIntouchSchema } from "../user.policies";
import { handleResponse } from "../../../../utils/response";
import UserModel from "../user.model";

const getInTouch = async (req: IReq, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    phoneNo,
    message,
  }: z.infer<typeof getIntouchSchema> = req.body;

  try {
    const user = await new UserModel({
      firstName,
      lastName,
      email,
      phoneNo,
      message,
    }).save();

    //TODO: send mail
    return handleResponse({
      res,
      message: "message sent successfully",
      data: user,
    });
  } catch (err: any) {
    return handleResponse({
      res,
      err,
      status: 500,
      message: `Internal server error:  ${err.message}`,
    });
  }
};

export default getInTouch;
