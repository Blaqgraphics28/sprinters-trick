"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    about: {
        type: String,
        required: [true, 'please enter what the post is all about']
    },
    postImage: {
        type: String,
        required: [true, 'an image post is required']
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
}, { timestamps: true });
exports.BlogModel = (0, mongoose_1.model)("Blog", blogSchema);
//# sourceMappingURL=blog.model.js.map