import { Request, Response } from "express";
import { z } from "zod";

import { NewsletterModel } from "../user.model";
import { handleResponse } from "../../../../utils/response";
import { newsletterSchema } from "../user.policies";

const subscribeToNewsletter = async (req: Request, res: Response) => {
  const { email }: z.infer<typeof newsletterSchema> = req.body;

  try {
    const existingEmail = await NewsletterModel.findOne({ email });
    if (existingEmail) {
      return handleResponse({
        res,
        status: 409,
        message: "Email already subscribed",
      });
    }

    await new NewsletterModel({ email }).save();

    return handleResponse({
      res,
      message: "successfully",
    });
  } catch (error) {
    handleResponse({
      res,
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export default subscribeToNewsletter;
