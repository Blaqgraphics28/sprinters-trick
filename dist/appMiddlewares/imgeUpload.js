"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageMiddleware = void 0;
const node_crypto_1 = require("node:crypto");
const cloudinary_1 = require("cloudinary");
const response_1 = require("../utils/response");
function uploadImageMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.file) {
            return (0, response_1.handleResponse)({
                res,
                status: 400,
                message: "please, upload a file",
            });
        }
        let imageId = (0, node_crypto_1.randomBytes)(8).toString("hex");
        req.imageId = req.body.imageId;
        if (req.imageId) {
            imageId = req.imageId.replace("sprinters/", "");
            yield cloudinary_1.v2.uploader.destroy(imageId, {
                resource_type: "image",
            });
        }
        const imgBuffer = req.file.buffer;
        new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader
                .upload_stream({
                folder: "sprinters",
                public_id: imageId,
            }, (error, uploadResult) => {
                error ? reject(error) : resolve(uploadResult);
            })
                .end(imgBuffer);
        })
            .then((uploadedImage) => {
            req.imageDetails = {
                imageId: uploadedImage.public_id,
                imageUrl: uploadedImage.secure_url,
            };
            next();
        })
            .catch((err) => (0, response_1.handleResponse)({
            res,
            err,
            message: `Internal Server Error:  ${err.message}`,
            status: 500,
        }));
    });
}
exports.uploadImageMiddleware = uploadImageMiddleware;
//# sourceMappingURL=imgeUpload.js.map