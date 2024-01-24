import { z } from "zod";
import { Response } from "express";

import { IRequest } from "src/types";
import { createBlogSchema } from "../blog.policies";
import { handleResponse } from "../../../../utils/response";
import { BlogModel } from "../blog.model";

const createBlog = async (req: IRequest, res: Response) => {
  const {
    description,
    title,
    image,
    tags,
    content,
  }: z.infer<typeof createBlogSchema> = req.body;

  let Blog;
  try {
    Blog = await new BlogModel({
      description,
      title,
      image,
      tags,
      content,
    }).save();

    return handleResponse({
      res,
      status: 201,
      message: "blog created successfully",
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

export default createBlog;