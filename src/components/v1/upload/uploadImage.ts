import { Response } from "express";
import { randomBytes } from "node:crypto";
import { v2, UploadApiResponse } from "cloudinary";

import { handleResponse } from "../../../utils/response";
import { IRequest } from "../../../types";

export function uploadImage(req: IRequest, res: Response) {
  if (!req.file) {
    return handleResponse({
      res,
      status: 400,
      message: "please, upload a file",
    });
  }

  const imageId = randomBytes(8).toString("hex");
  const imgBuffer = req.file.buffer;

  return new Promise<UploadApiResponse>((resolve, reject) => {
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
    .then((uploadedImage: UploadApiResponse) =>
      handleResponse({
        res,
        message: "Image upload successful",
        data: {
          imageId: uploadedImage.public_id,
          imageUrl: uploadedImage.secure_url,
        },
      })
    )
    .catch((err: any) =>
      handleResponse({
        res,
        err,
        message: `Internal Server Error:  ${err.message}`,
        status: 500,
      })
    );
}
