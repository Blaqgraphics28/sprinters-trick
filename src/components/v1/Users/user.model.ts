import { model, Schema } from "mongoose";
import platformConstants from "../../../configs/platformConstants";
import { IGetIntouch, INewsletter, IUser } from "./user.types";

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
export const UserModel = model<IUser>("User", userSchema);

const getInTouchSchema = new Schema<IGetIntouch>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "visitor",
      enum: platformConstants.userRole,
    },
  },
  { timestamps: true }
);

export const GetIntouchModel = model<IGetIntouch>(
  "GetIntouch",
  getInTouchSchema
);

const newsletterSchema = new Schema<INewsletter>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export const NewsletterModel = model<INewsletter>(
  "Newsletter",
  newsletterSchema
);

