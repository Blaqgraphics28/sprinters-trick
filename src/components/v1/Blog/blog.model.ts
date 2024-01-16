import {model, Schema } from "mongoose"
import { IBlog } from "../Users/user.types";

const blogSchema = new Schema<IBlog>({
    postImage: {
        type: String,
        required: [true, 'an image post is required']  
    },
    about: {
        type: String,
        required: [true, 'please enter what the post is all about']
    },
    topic: {
        type: String,
        required: [true, 'a topic is required']
    },
    post: {
        type: String,
        required: [true, 'post is required']
    },
    authorImage: {
        type: String,
        required: [true, 'author image is required']
    },
    authorName: {
        type: String,
        required: [true, 'author name is required']
    }
},
{timestamps: true}
)

export const BlogModel = model<IBlog>(
    "Blog",
    blogSchema
)