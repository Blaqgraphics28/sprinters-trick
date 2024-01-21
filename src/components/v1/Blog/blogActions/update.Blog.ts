import { Response } from "express";
import { IReq } from "../../../../types";
import { z } from "zod";
import { blogSchema } from "../../Users/user.policies";
import { handleResponse } from "../../../../utils/response";
import { BlogModel } from "../blog.model";



export const updateBlog = async (req: IReq, res: Response) => {
  const { blogId } = req.params;

  const {
    // postImage,
    about,
    topic,
    post,
    authorImage,
    authorName,
  }: z.infer<typeof blogSchema> = req.body;

  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      blogId,
      {
        // postImage,
        about,
        topic,
        post,
        authorImage,
        authorName,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return handleResponse({
        res,
        status: 404,
        message: "Blog not found for update",
      });
    }

    return handleResponse({
      res,
      status: 200,
      message: "Blog updated successfully",
      data: updatedBlog,
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
