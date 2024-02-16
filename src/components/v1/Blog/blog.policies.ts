import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string(),
  tags: z.array(z.string()),
  content: z.string(),
  description: z.string(),
});

export const editBlogSchema = z.object({
  description: z.string(),
  title: z.string(),
  tags: z.array(z.string()),
  content: z.string(),
  imageId: z.string(),
  blogId: z.string()
});

export const blogImage = z.object({
  postImage: z.string(),
});
