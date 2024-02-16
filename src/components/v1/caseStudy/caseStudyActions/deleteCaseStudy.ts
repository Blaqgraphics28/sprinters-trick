import { Response } from "express";

import { IRequest } from "src/types";
import CaseStudyModel from "../caseStudy.model";
import { handleResponse } from "../../../../utils/response";
import { v2 } from "cloudinary";

const deleteCaseStudy = async (req: IRequest, res: Response) => {
  const { caseStudyId, imageId } = req.query;

  try {
    if (!imageId)
      return handleResponse({
        res,
        message: "please provide image id",
      });

    const ImageId = String(imageId).replace("sprinters/", "");
    await v2.uploader.destroy(ImageId, {
      resource_type: "image",
    });

    const deleteCaseStudy = await CaseStudyModel.findByIdAndDelete(caseStudyId);
    if (!deleteCaseStudy) {
      return handleResponse({
        res,
        status: 400,
        message: "case study not found",
      });
    }

    return handleResponse({
      res,
      status: 200,
      message: "caseStudy deleted successfully",
    });
  } catch (err: any) {
    console.error(err);
    return handleResponse({
      res,
      err,
      status: 500,
      message: `Internal Server Error:  ${err.message}`,
    });
  }
};

export default deleteCaseStudy;
