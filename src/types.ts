import { Request } from "express"
import { Types } from "mongoose";
import { IUser } from "./components/v1/Users/user.types";
import { IAuth } from "./components/v1/Auth/auth.model";

export interface IRequest extends Request {
  user?: IUser;
  userAuth?: IAuth;
  decoded?: IToken;
  ref?: string;
  imageId?: string;
  imageDetails?: {
    imageId: string;
    imageUrl: string;
  };
}

export interface IToken {
  ref: Types.ObjectId;
  role: string;
}