import { Response } from "express";
import { IRequest } from "../../../../types";
import { handleResponse } from "../../../../utils/response";
import { z } from "zod";
import { UserModel } from "../../Users/user.model";
import { AuthModel } from "../auth.model";

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const login = async (req: IRequest, res: Response) => {
  const { email, password }: z.infer<typeof loginSchema> = req.body;
  try {

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return handleResponse({
        res,
        status: 401,
        message: "Invalid login credentials",
      });
    }

    const userAuth = await AuthModel.findOne({
      User: existingUser._id,
    });
    if (!userAuth) {
      return handleResponse({
        res,
        status: 401,
        message: "Invalid login credentials",
      });
    }

if (!userAuth.comparePassword(password))
  return handleResponse({
    res,
    message: "Invalid login credentials",
    status: 401,
  });


    const token = userAuth.generateToken({
      data: {
        ref: existingUser._id,
        role: userAuth.role,
      },
    });

    return handleResponse({
      res,
      message: "Login successful, Welcome 🤗",
      data: {
        token,
        profile: existingUser,
      },
    });
  } catch (error: any) {
    return handleResponse({
      res,
      status: 500,
      message: `Internal Server Error:  ${error.message}`,
    });
  }
};

export default login;
