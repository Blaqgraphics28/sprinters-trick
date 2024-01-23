import { Response } from "express";
import { z } from "zod";

import { IRequest } from "../../../../types";
import { handleResponse } from "../../../../utils/response";
import CaseStudyModel from "../caseStudy.model";

const getCaseStudy = async (req: IRequest, res: Response) => {
  const { caseStudyId } = req.query;
  let caseStudy;
  try {
    if (caseStudyId) {
      caseStudy = await CaseStudyModel.findOne({ _id: String(caseStudyId) });
      if (!caseStudy)
        return handleResponse({
          res,
          message: "case study not found",
          status: 400,
        });

      return handleResponse({
        res,
        message: "Success",
        data: caseStudy,
      });
    }

    caseStudy = await CaseStudyModel.find();
    return handleResponse({
      res,
      message: "Success",
      data: caseStudy,
    });
  } catch (err: any) {
    return handleResponse({
      res,
      err,
      status: 500,
      message: "Internal server error: ${err.message}",
    });
  }
};

export default getCaseStudy;
