import { Response } from "express";
import { IRequest } from "../../../../types";
import { handleResponse } from "../../../../utils/response";
import { editCaseStudySchema } from "../caseStudy.policies";
import { z } from "zod";
import CaseStudyModel from "../caseStudy.model";
import { v2 } from "cloudinary";

const editCaseStudy = async (req: IRequest, res: Response) => {
  const {
    projectTitle,
    projectSubtitle,
    projectDescription,
    projectOverview,
    problem,
    solution,
    clientName,
    projectTimeline,
    projectCategory,
    servicesProvides,
    caseStudyId: id,
  }: z.infer<typeof editCaseStudySchema> = req.body;

  let caseStudy;
  try {
    const { imageDetails } = req;
    caseStudy = await CaseStudyModel.findById(id);
    if (!caseStudy)
      return handleResponse({
        res,
        status: 400,
        message: "case study not found",
      });

    caseStudy = await CaseStudyModel.findByIdAndUpdate(id, {
      $set: {
        projectTitle,
        projectSubtitle,
        projectDescription,
        projectOverview,
        problem,
        solution,
        clientName,
        projectTimeline,
        projectCategory,
        servicesProvides,
        coverPhoto: imageDetails,
      },
      new: true,
    });

    return handleResponse({
      res,
      message: "case study edited successfully",
      data: caseStudy,
    });
  } catch (error: any) {
    return handleResponse({
      res,
      status: 500,
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

export default editCaseStudy;
