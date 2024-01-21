import express, { Request, Response } from 'express';
import fileUpload, { UploadedFile } from 'express-fileupload';
import cloudinary, { UploadApiResponse } from 'cloudinary';

const app = express()

interface CloudinaryConfig {
    cloud_name: string;
    api_key: string;
    api_secret: string;
  }
  
  const cloudinaryConfig: CloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_NAME || '',
    api_key: process.env.CLOUDINARY_API_KEY || '',
    api_secret: process.env.CLOUDINARY_API_SECRET || '',
  };

(cloudinary as any).config(cloudinaryConfig);

console.log('postImage');

app.use(fileUpload())
export const uploadPostImage = async (req: Request, res: Response) => {
  try {
    console.log(req.files);
    
    const postImage = req.files?.postImage as UploadedFile | undefined;
    console.log(postImage)
    console.log('Received request:', req.body);
    // Check if file exists
    if (!postImage) {
      return res.status(400).json({ error: 'Image file is missing' });
    }

    // Check MIME type
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedMimeTypes.includes(postImage.mimetype)) {
      return res.status(400).json({ error: 'Invalid MIME type for image' });
    }

    // Check size (in bytes)
    
    const maxFileSize = 1024 * 1024; // 1 MB
    if (postImage.size > maxFileSize) {
      return res.status(400).json({ error: 'Image size exceeds the maximum allowed size' });
    }

    // Upload to Cloudinary
    const result: UploadApiResponse = await cloudinary.v2.uploader.upload(postImage.tempFilePath, {
      use_filename: true,
      folder: 'blog',
    });

    // Respond with the uploaded image URL
    res.status(200).json({ image: { src: result.secure_url } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

