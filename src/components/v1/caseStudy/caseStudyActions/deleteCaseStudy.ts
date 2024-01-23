import { Response } from "express";

import { IRequest } from "src/types";
import CaseStudyModel from "../caseStudy.model";
import { handleResponse } from "../../../../utils/response";

const deleteCaseStudy = async (req: IRequest, res: Response) => {
  const { caseStudyId } = req.params;

  try {
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
      message: "Internal server error: ${err.message}",
    });
  }
};

export default deleteCaseStudy;
