import { model, Schema } from "mongoose";
import platformConstants from "../../../configs/platformConstants";
import { IGetIntouch, INewsletter } from "./user.types";

const getInTouchSchema = new Schema<IGetIntouch>(
  {
    firstName: {
      type: String,
      required: [true, "please enter your first name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "please enter your last name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      unique: true,
    },
    phoneNo: {
      type: String,
      required: [true, "please enter your phone number"],
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
