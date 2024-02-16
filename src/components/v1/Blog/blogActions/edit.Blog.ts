import { Response } from "express";
import { IRequest } from "../../../../types";
import { z } from "zod";
import { handleResponse } from "../../../../utils/response";
import { BlogModel } from "../blog.model";
import { editBlogSchema } from "../blog.policies";

const editBlog = async (req: IRequest, res: Response) => {
  const {
    description,
    title,
    tags,
    content,
    blogId,
  }: z.infer<typeof editBlogSchema> = req.body;

  const { imageDetails } = req;
  try {
    if (!blogId)
      return handleResponse({
        res,
        status: 400,
        message: "please, provide blog Id",
      });

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      blogId,
      {
        $set: {
          description,
          title,
          image: imageDetails,
          tags,
          content,
        },
      },
      { new: true }
    );

    if (!updatedBlog) {
      return handleResponse({
        res,
        status: 404,
        message: "Blog not found",
      });
    }

    return handleResponse({
      res,
      status: 200,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (err: any) {
    return handleResponse({
      res,
      err,
      status: 500,
      message: `Internal server error: ${err.message}`,
    });
  }
};

export default editBlog;
