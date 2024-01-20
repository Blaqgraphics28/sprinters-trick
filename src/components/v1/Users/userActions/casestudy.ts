import { Request, Response } from "express";
import { z } from "zod";
import { caseStudyschema } from "../user.policies";
import { handleResponse } from "src/utils/response";
import { caseStudyModel } from "../user.model";
import { IReq } from "src/types";

export const getAllcaseStudy = async (req: IReq, res: Response) => {
    try {
        const casestudy = await caseStudyModel.find({});
        if (!casestudy) {
            return handleResponse({
                res,
                status: 404,
                message: "no casestudy available yet",
            });
        }
        return handleResponse({
            res,
            status: 200,
            data: casestudy,
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

export const getSinglecaseStudy = async (req: IReq, res: Response) => {
    const { casestudyId } = req.params;

    try {
        const casestudy = await caseStudyModel.findById(casestudyId);
        if (!casestudy) {
            return handleResponse({
                res,
                status: 404,
                message: "caseStudy not found",
            });
        }

        return handleResponse({
            res,
            message: "caseStudy retrieved successfully",
            data: casestudy,
        });
    } catch (err: any) {
        console.error(err);
        return handleResponse({
            res,
            err,
            status: 500,
            message: 'Internal server error: ${err.message}',
        });
    }
};

export const updatecaseStudy = async (req: IReq, res: Response) => {
    const { casestudyId } = req.params;

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
        const updatedcaseStudy = await caseStudyModel.findByIdAndUpdate(
            casestudyId,
            {
                topic,
                about,
                postImage,
                projectOverview,
                Oursolution,
                name,
                category,
                projecttimeline,
                services,
            },
            { new: true }
        );

        if (!updatedcaseStudy) {
            return handleResponse({
                res,
                status: 404,
                message: "casestudy not found for update",
            });
        }

        return handleResponse({
            res,
            status: 200,
            message: "caseStudy updated successfully",
            data: updatedcaseStudy,
        });
    } catch (err: any) {
        console.error(err);
        return handleResponse({
            res,
            err,
            status: 500,
            message: 'Internal server error: ${err.message}',
        });
    }
};

export const deletecaseStudy = async (req: IReq, res: Response) => {
    const { casestudyId } = req.params;

    try {
        const deletedcaseStudy = await caseStudyModel.findByIdAndDelete(casestudyId);

        if (!deletedcaseStudy) {
            return handleResponse({
                res,
                status: 404,
                message: "caseStudy not found",
            });
        }

        return handleResponse({
            res,
            status: 200,
            message: "caseStudy deleted successfully",
            data: deletedcaseStudy,
        });
    } catch (err: any) {
        console.error(err);
        return handleResponse({
            res,
            err,
            status: 500,
            message: 'Internal server error: ${err.message}',
        });
    }
};
