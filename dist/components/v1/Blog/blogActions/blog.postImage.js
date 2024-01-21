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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPostImage = void 0;
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const app = (0, express_1.default)();
const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_NAME || '',
    api_key: process.env.CLOUDINARY_API_KEY || '',
    api_secret: process.env.CLOUDINARY_API_SECRET || '',
};
cloudinary_1.default.config(cloudinaryConfig);
console.log('postImage');
app.use((0, express_fileupload_1.default)());
const uploadPostImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log(req.files);
        const postImage = (_a = req.files) === null || _a === void 0 ? void 0 : _a.postImage;
        console.log(postImage);
        console.log('Received request:', req.body);
        // Check if file exists
        if (!postImage) {
            return res.status(400).json({ error: 'Image file is missing' });
        }
        // // Check MIME type
        // const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
        // if (!allowedMimeTypes.includes(postImage.mimetype)) {
        //   return res.status(400).json({ error: 'Invalid MIME type for image' });
        // }
        // Check size (in bytes)
        const maxFileSize = 1024 * 1024; // 1 MB
        if (postImage.size > maxFileSize) {
            return res.status(400).json({ error: 'Image size exceeds the maximum allowed size' });
        }
        // Upload to Cloudinary
        const result = yield cloudinary_1.default.v2.uploader.upload(postImage.tempFilePath, {
            use_filename: true,
            folder: 'blog',
        });
        // Respond with the uploaded image URL
        res.status(200).json({ image: { src: result.secure_url } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.uploadPostImage = uploadPostImage;
// // Define a route for uploading images
// app.post('/upload', async (req: Request, res: Response) => {
//   try {
//     const imageFile = req.files?.image as UploadedFile | undefined;
//     // Check if file exists
//     if (!imageFile) {
//       return res.status(400).json({ error: 'Image file is missing' });
//     }
//     // Upload to Cloudinary
//     const result: UploadApiResponse = await cloudinary.uploader.upload(imageFile.tempFilePath, {
//       use_filename: true,
//       folder: 'uploads',
//     });
//     // Respond with the uploaded image URL
//     res.status(200).json({ image: { src: result.secure_url } });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// // // Start the server
// // app.listen(port, () => {
// //   console.log(`Server is running on http://localhost:${port}`);
// // });
// import express, { Request, Response } from 'express';
// import multer, { Multer } from 'multer';
// import cloudinary, { UploadApiResponse } from 'cloudinary';
// const app = express();
// interface CloudinaryConfig {
//   cloud_name: string;
//   api_key: string;
//   api_secret: string;
// }
// const cloudinaryConfig: CloudinaryConfig = {
//   cloud_name: process.env.CLOUDINARY_NAME || '',
//   api_key: process.env.CLOUDINARY_API_KEY || '',
//   api_secret: process.env.CLOUDINARY_API_SECRET || '',
// };
// (cloudinary as any).config(cloudinaryConfig);
// // Multer Configuration
// const storage = multer.memoryStorage(); // Store files in memory
// const upload: Multer = multer({ storage });
// // Handling function for image upload
// export const uploadPostImage = async (req: Request, res: Response) => {
//   try {
//     const uploadedImage = req.file as Express.Multer.File;
// console.log(req.files, req.headers, req.body);
//     // Check if file exists
//     if (!uploadedImage) {
//       return res.status(400).json({ error: 'Image file is missing' });
//     }
//     // Check MIME type
//     const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
//     if (!allowedMimeTypes.includes(uploadedImage.mimetype)) {
//       return res.status(400).json({ error: 'Invalid MIME type for image' });
//     }
//     // Check size (in bytes)
//     const maxFileSize = 1024 * 1024; // 1 MB
//     if (uploadedImage.size > maxFileSize) {
//       return res.status(400).json({ error: 'Image size exceeds the maximum allowed size' });
//     }
//     // Upload to Cloudinary
// // ...// ...
// const result: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
//   cloudinary.v2.uploader.upload_stream(
//     { use_filename: true, folder: 'blog' },
//     (error, result) => {
//       if (error) {
//         console.error(error);
//         reject(error);
//       } else {
//         resolve(result);
//       }
//     }
//   ).end(uploadedImage.buffer);
// });
// // Check if result is defined before accessing its properties
// if (result && result.secure_url) {
//   // Respond with the uploaded image URL
//   res.status(200).json({ image: { src: result.secure_url } });
// } else {
//   // Handle the case when result or result.secure_url is undefined
//   res.status(500).json({ error: 'Internal Server Error' });
// }
// // ...
// // ...
//     // Respond with the uploaded image URL
//     // res.status(200).json({ image: { src: result.secure_url } });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
// // Export the Multer middleware
// export const uploadMiddleware = upload.single('image');
//# sourceMappingURL=blog.postImage.js.map