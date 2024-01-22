import platformConstants from "src/configs/platformConstants";


export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
}

export interface IGetIntouch extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  message: string;
  role: (typeof platformConstants.userRole)[number];
}

export interface INewsletter extends Document {
  email: string;
}
