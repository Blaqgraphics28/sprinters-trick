import mongoose, { Document } from "mongoose";
import platformConstants from "../../../configs/platformConstants";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  message: string;
  role: (typeof platformConstants.userRole)[number]
}


const userSchema = new mongoose.Schema<IUser>(
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
      required: true
    },
    role: {
        type: String,
        default: "visitor",
        enum: platformConstants.userRole
    }
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("UserModel", userSchema);

export default UserModel;
export { IUser };
