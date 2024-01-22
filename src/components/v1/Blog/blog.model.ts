import { model, Schema, Types } from "mongoose";

interface IBlog extends Document {
  description: string;
  title: string;
  image: { imageId: string; imageUrl: string };
  tags: string[];
  content: string;
  User: Types.ObjectId;
}

const blogSchema = new Schema<IBlog>(
  {
    description: String,
    title: String,
    image: { imageId: String, imageUrl: String },
    tags: [String],
    content: String,
    User: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const BlogModel = model<IBlog>("Blog", blogSchema);
