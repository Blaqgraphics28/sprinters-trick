import { z } from "zod";
import { Response } from "express";

import { IRequest } from "src/types";

import { handleResponse } from "../../../../utils/response";
import { BlogModel } from "../blog.model";

export const getBlog = async (req: IRequest, res: Response) => {
  const blogIdSchema = z.object({ blog_id: z.string().optional() });
  const { blog_id }: z.infer<typeof blogIdSchema> = blogIdSchema.parse(
    req.query
  );
  let Blog;
  try {
    console.log(blog_id)
    if (blog_id) {
      Blog = await BlogModel.findOne({ _id: blog_id });
      if (!Blog)
        return handleResponse({ res, status: 400, message: "Blog not found" });
        const otherBlogs = await BlogModel.find({ _id: { $ne: blog_id } });

      return handleResponse({
        res,
        message: "success",
        data: {Blog, otherBlogs},
      });
    }

    Blog = await BlogModel.find();
    return handleResponse({
      res,
      message: "success",
      data: Blog,
    });
  } catch (err: any) {
    return handleResponse({
      res,
      err,
      status: 500,
      message: `Internal server error:  ${err.message}`,
    });
  }
};
