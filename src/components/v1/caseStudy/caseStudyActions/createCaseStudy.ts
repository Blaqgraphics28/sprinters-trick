import { z } from "zod";
import { Response } from "express";

import { IRequest } from "../../../../types";
import { handleResponse } from "../../../../utils/response";
import CaseStudyModel from "../caseStudy.model";
import { createCaseStudySchema } from "../caseStudy.policies";

const createCaseStudy = async (req: IRequest, res: Response) => {
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
  }: z.infer<typeof createCaseStudySchema> = req.body;

  const { imageDetails } = req;
  try {
    const caseStudy = await new CaseStudyModel({
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
    }).save();

    return handleResponse({
      res,
      status: 201,
      message: "caseStudy created successfully",
      data: caseStudy,
    });
  } catch (err: any) {
    return handleResponse({
      res,
      err,
      status: 500,
      message: `Internal Server Error:  ${err.message}`,
    });
  }
};

export default createCaseStudy;
