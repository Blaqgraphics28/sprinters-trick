import { Response } from "express";
import { IRequest } from "../../../../types";
import { handleResponse } from "../../../../utils/response";
import { BlogModel } from "../blog.model";
import { v2 } from "cloudinary";

export const deleteBlog = async (req: IRequest, res: Response) => {
  const { blogId, imageId } = req.query;

  try {
    const ImageId = String(imageId).replace("sprinters/", "");
    await v2.uploader
      .destroy(ImageId, {
        resource_type: "image",
      })
      .catch((err) => {
        throw err;
      });

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
