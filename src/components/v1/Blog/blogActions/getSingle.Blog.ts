import { Response } from "express";
import { IReq } from "../../../../types";
import { z } from "zod";
import { blogSchema } from "../../Users/user.policies";
import { handleResponse } from "../../../../utils/response";
import { BlogModel } from "../blog.model";


export const getSingleBlog = async (req: IReq, res: Response) => {
  const { blogId } = req.params;

  try {
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return handleResponse({
        res,
        status: 404,
        message: "Blog not found",
      });
    }

    return handleResponse({
      res,
      message: "Blog retrieved successfully",
      data: blog,
    });
  } catch (err: any) {
    console.error(err);
    return handleResponse({
      res,
      err,
      status: 500,
      message: `Internal server error: ${err.message}`,
    });
  }
};
