"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    authorName: String,
    description: String,
    title: String,
    image: { imageId: String, imageUrl: String },
    tags: [String],
    content: String,
    User: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
exports.BlogModel = (0, mongoose_1.model)("Blog", blogSchema);
//# sourceMappingURL=blog.model.js.map