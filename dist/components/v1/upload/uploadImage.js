"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const node_crypto_1 = require("node:crypto");
const cloudinary_1 = require("cloudinary");
const response_1 = require("../../../utils/response");
function uploadImage(req, res) {
    if (!req.file) {
        return (0, response_1.handleResponse)({
            res,
            status: 400,
            message: "please, upload a file",
        });
    }
    const imageId = (0, node_crypto_1.randomBytes)(8).toString("hex");
    const imgBuffer = req.file.buffer;
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader
            .upload_stream({
            folder: "sprinters",
            public_id: imageId,
        }, (error, uploadResult) => {
            error ? reject(error) : resolve(uploadResult);
        })
            .end(imgBuffer);
    })
        .then((uploadedImage) => (0, response_1.handleResponse)({
        res,
        message: "Image upload successful",
        data: {
            imageId: uploadedImage.public_id,
            imageUrl: uploadedImage.secure_url,
        },
    }))
        .catch((err) => (0, response_1.handleResponse)({
        res,
        err,
        message: "Internal Server Error",
        status: 500,
    }));
}
exports.uploadImage = uploadImage;
//# sourceMappingURL=uploadImage.js.map