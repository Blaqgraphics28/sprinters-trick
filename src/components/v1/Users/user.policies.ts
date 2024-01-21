import { z } from "zod";
import { isValidPhoneNo } from "../../../utils/helpers";

export const getIntouchSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNo: z.string().refine((value) => isValidPhoneNo(value), {
    message: "invalid",
  }),
  message: z.string(),
});

export const newsletterSchema = z.object({
  email: z.string().email(),
});


// blog schema created by okikijesu

export const blogSchema = z.object({
  blogDescription: z.string(),
  blogTitle: z.string(),
  imageUrl: z.string(),
  blogTags: z.array(z.string()),
  authorImage: z.string(),
  authorName: z.string()
})

export const blogImage =  z.object({
  postImage: z.string()
});