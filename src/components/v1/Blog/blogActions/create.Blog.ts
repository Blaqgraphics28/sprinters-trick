import { z } from "zod";
import { Response } from "express";

import { IRequest } from "src/types";
import { createBlogSchema } from "../blog.policies";
import { handleResponse } from "../../../../utils/response";
import { BlogModel } from "../blog.model";

const createBlog = async (req: IRequest, res: Response) => {
  // const {
  //   description,
  //   destination,
  //   title,
  //   tags,
  //   content,
  //   authorName
  // }: z.infer<typeof createBlogSchema> = req.body;

  const {
    description,
    destination,
    title,
    tags,
    content,
    authorName
  } = req.body;



  const { user } = req;
  const { imageDetails } = req;
  let Blog;
  try {
    Blog = await new BlogModel({
      authorName ,
      description,
      title,
      destination,
      // image: imageDetails,
      tags,
      // content,
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
