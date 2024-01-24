import { model, Schema } from "mongoose";
import { IGetIntouch, INewsletter, IUser } from "./user.types";

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const UserModel = model<IUser>("User", userSchema);

const getInTouchSchema = new Schema<IGetIntouch>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNo: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
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
