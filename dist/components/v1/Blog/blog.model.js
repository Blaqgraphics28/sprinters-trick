"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.BlogModel = (0, mongoose_1.model)("Blog", blogSchema);
//# sourceMappingURL=blog.model.js.map