import { z } from "zod";
import { response } from "express";

import { IReq } from "src/types";
import { caseStudyschema } from "../user.policies";
import { handleResponse } from "src/utils/response";
import { caseStudyModel } from "../user.model";

export const createcaseStudy = async (req: IReq, res: Response) => {
    const {
        topic,
        about,
        postImage,
        projectOverview,
        Oursolution,
        name,
        category,
        projecttimeline,
        services,
    }: z.infer<typeof caseStudyschema> = req.body;

    try {
        const caseStudy = await new caseStudyModel({
            topic,
            about,
            postImage,
            projectOverview,
            Oursolution,
            name,
            category,
            projecttimeline,
            services,
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
            message: 'Internal server error: ${err.message}',
        });
    }
};