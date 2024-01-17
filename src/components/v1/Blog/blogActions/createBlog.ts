import { z } from "zod";
import { Response } from "express";

import { IReq } from "src/types";
import { blogSchema } from "../../Users/user.policies";
import { handleResponse } from "../../../../utils/response";
import { BlogModel } from "../blog.model";

export const createBlog = async (req: IReq, res: Response) => {
  const {
    postImage,
    about,
    topic,
    post,
    authorImage,
    authorName,
  }: z.infer<typeof blogSchema> = req.body;

  try {
    const blog = await new BlogModel({
      postImage,
      about,
      topic,
      post,
      authorImage,
      authorName,
    }).save();

    return handleResponse({
      res,
      status: 201,
      message: "blog created successfully",
      data: blog,
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
