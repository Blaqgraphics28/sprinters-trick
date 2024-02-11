import { NextFunction, Response } from "express";
import { randomBytes } from "node:crypto";
import { v2, UploadApiResponse } from "cloudinary";

import { handleResponse } from "../utils/response";
import { IRequest } from "../types";

export async function uploadImageMiddleware(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.file) {
    return handleResponse({
      res,
      status: 400,
      message: "please, upload a file",
    });
  }

  let imageId = randomBytes(8).toString("hex");
  req.imageId = req.body.imageId;

  if (req.imageId) {
    imageId = req.imageId.replace("sprinters/", "");
    await v2.uploader.destroy(imageId, {
      resource_type: "image",
    });
  }

  const imgBuffer = req.file.buffer;

  new Promise<UploadApiResponse>((resolve, reject) => {
    v2.uploader
      .upload_stream(
        {
          folder: "sprinters",
          public_id: imageId,
        },
        (error, uploadResult) => {
          error ? reject(error) : resolve(uploadResult as UploadApiResponse);
        }
      )
      .end(imgBuffer);
  })
    .then((uploadedImage: UploadApiResponse) => {
      req.imageDetails = {
        imageId: uploadedImage.public_id,
        imageUrl: uploadedImage.secure_url,
      };

      next();
    })
    .catch((err: any) =>
      handleResponse({
        res,
        err,
        message: `Internal Server Error:  ${err.message}`,
        status: 500,
      })
    );
}
