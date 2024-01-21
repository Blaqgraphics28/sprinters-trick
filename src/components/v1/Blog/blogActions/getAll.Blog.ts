import { Response } from "express";
import { IReq } from "../../../../types";
import { handleResponse } from "../../../../utils/response";
import { BlogModel } from "../blog.model";

export const getAllBlogs = async (req: IReq, res: Response) => {
  try {
    console.log('get all blogd');
    
    const blogs = await BlogModel.find({});
    if (!blogs) {
      return handleResponse({
        res,
        status: 404,
        message: "no blogs available yet",
      });
    }

    return handleResponse({
      res,
      status: 200,
      data: blogs,
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