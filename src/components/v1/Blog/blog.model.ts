import {model, Schema } from "mongoose"
import { IBlog } from "../Users/user.types";

const blogSchema = new Schema<IBlog>({
    
    blogDescription: {
        type: String,
        required: [true, 'please enter blog description']
    },
    blogTitle: {
        type: String,
        required: [true, 'please enter blog title']  
    },
   blogTags: {
    type: [String],
    default: [""]
   },
    imageUrl: {
        type: String,
        required: [true, 'please provide blog image']
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