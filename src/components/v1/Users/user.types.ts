import platformConstants from "src/configs/platformConstants";

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

// case study section made by alaya
export interface ICasestudy extends Document {
  topic: string,
  about: string,
  postImage: string,
  projectOverview: string,
  OurSolution: string,
  name: string,
  category: string,
  projecttimeline: string,
  services: string,
  
}