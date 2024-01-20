import { model, Schema } from "mongoose";
import platformConstants from "../../../configs/platformConstants";
import { IGetIntouch, INewsletter, ICasestudy} from "./user.types";

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

const caseStudyschema = new Schema<ICasestudy>({
  topic: {
    type: String,
    required: [true, 'a topic is required']
  },
  about: {
    type: String,
    required: [true, 'please enter what the post is all about']
  },
  postImage: {
    type: String,
    required: [true, 'an image post is required']
  },
  projectOverview: {
    type: String,
    required: [true, 'an overview of the project is required']
  },
  OurSolution: {
    type: String,
    required: [true, 'the solution is required']
  },
  name: {
    type: String,
    required: [true, 'The client name is required']
  },
  category: {
    type: String,
    required: [true, 'project category is required']
  },
  projecttimeline: {
    type: String,
    required: [true, 'The project timeline is required']
  },
  services: {
    type: String,
    required: [true, 'The services is required']
  },
}, {timestamps: true}

);
export const caseStudyModel = model<ICasestudy>(
  "casestudy",
  caseStudyschema
);