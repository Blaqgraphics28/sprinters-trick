import { z } from "zod";

export const createBlogSchema = z.object({
  description: z.string(),
  title: z.string(),
  image: z.object({ imageId: z.string(), imageUrl: z.string() }),
  tags: z.array(z.string()),
  content: z.string(),
});

export const blogImage = z.object({
  postImage: z.string(),
});
