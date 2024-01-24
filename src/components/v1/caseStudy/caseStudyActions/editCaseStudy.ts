import { Response } from "express";
import { IRequest } from "../../../../types";
import { handleResponse } from "../../../../utils/response";
import { createCaseStudySchema } from "../caseStudy.policies";
import { z } from "zod";
import CaseStudyModel from "../caseStudy.model";

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
    coverPhoto,
  }: z.infer<typeof createCaseStudySchema> = req.body;

  const Id = z.object({ id: z.string().optional() });
  const { id }: z.infer<typeof Id> = req.params;
  let caseStudy;
  try {
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
        coverPhoto,
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
