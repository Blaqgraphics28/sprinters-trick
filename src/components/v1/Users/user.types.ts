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

// blog section made by Okikijesu

export interface IBlog extends Document {
  blogDescription: String,
  blogTitle: String,
  imageUrl: String,
  blogTags: String[];
  authorImage: String,
  authorName: String
}