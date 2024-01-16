import { Response } from "express";
import { IReq } from "../../../../types";
import { z } from "zod";
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
        authorName

    }: z.infer<typeof blogSchema> = req.body

    try {
        const blog = await new BlogModel({
            postImage,
            about,
            topic,
            post,
            authorImage,
            authorName
        }).save();

        return handleResponse({
            res,
            status: 201,
            message: "blog created successfully",
            data: blog
        })

    } catch (err: any) {
        return handleResponse({
            res,
            err,
            status: 500,
            message:  `Internal server error:  ${err.message}`
        })
    }

}

export const getAllBlogs = async(req: IReq, res: Response) => {
    try {
        const blogs = await BlogModel.find({});
        if (!blogs) {
            return handleResponse({
                res,
                status: 404,
                message: "no blogs available yet"
            });
        }

        return handleResponse({
            res,
            status: 200,
            data: blogs
        })
    } catch (err: any) {
        return handleResponse({
            res,
            err,
            status: 500,
            message:  `Internal server error: ${err.message}`
        });
        
    }
}

export const getSingleBlog = async (req: IReq, res: Response) => {
    const {blogId} = req.params;

    try {
       
        const blog = await BlogModel.findById(blogId);
        if (!blog) {
            return handleResponse({
                res,
                status: 404,
                message: "Blog not found"
            });
        }

        return handleResponse({
            res,
            message: "Blog retrieved successfully",
            data: blog
        });

    } catch (err: any) {
        console.error(err); 
        return handleResponse({
            res,
            err,
            status: 500,
            message:  `Internal server error: ${err.message}`
        });
    }
}


export const updateBlog = async (req: IReq, res: Response) => {
    const {blogId} = req.params;

    const {
        postImage,
        about,
        topic,
        post,
        authorImage,
        authorName
    }: z.infer<typeof blogSchema> = req.body;

    try {
        const updatedBlog = await BlogModel.findByIdAndUpdate(
            blogId,
            {
                postImage,
                about,
                topic,
                post,
                authorImage,
                authorName
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


export const deleteBlog = async (req: IReq, res: Response) => {
    const {blogId} = req.params;

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
            data: deletedBlog,
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