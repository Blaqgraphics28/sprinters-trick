import { Response } from "express";
import { IReq } from "../../../../types";
import { z } from "zod";
import { blogSchema } from "../../Users/user.policies";
import { handleResponse } from "../../../../utils/response";
import { BlogModel } from "../blog.model";

export const deleteBlog = async (req: IReq, res: Response) => {
  const { blogId } = req.params;

  try {
    const deletedBlog = await BlogModel.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return handleResponse({
        res,
        status: 404,
        message: "Blog not found ",
      });
    }

    return handleResponse({
      res,
      status: 200,
      message: "Blog deleted successfully",
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
