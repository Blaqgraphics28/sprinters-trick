import { Response } from "express";
import { IRequest } from "../../../../types";
import { z } from "zod";
import { getIntouchSchema } from "../user.policies";
import { handleResponse } from "../../../../utils/response";
import { GetIntouchModel } from "../user.model";

const getInTouch = async (req: IRequest, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    phoneNo,
    message,
  }: z.infer<typeof getIntouchSchema> = req.body;

  try {

    const getInTouch = await new GetIntouchModel({
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
      data: getInTouch,
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
