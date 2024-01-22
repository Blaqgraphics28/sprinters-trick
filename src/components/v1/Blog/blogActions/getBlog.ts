import { z } from "zod";
import { Response } from "express";

import { IReq } from "src/types";

import { handleResponse } from "../../../../utils/response";
import { BlogModel } from "../blog.model";

export const getBlog = async (req: IReq, res: Response) => {
  const blogIdSchema = z.object({ blogId: z.string() });
  const { blogId }: z.infer<typeof blogIdSchema> = blogIdSchema.parse(
    req.query
  );
  let Blog;
  try {
    if (blogId) {
      Blog = await BlogModel.findOne({ _id: blogId });
      if (!Blog)
        return handleResponse({ res, status: 400, message: "Blog not found" });

      return handleResponse({
        res,
        message: "success",
        data: Blog,
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
