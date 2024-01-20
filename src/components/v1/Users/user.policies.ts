import { z } from "zod";
import { isValidPhoneNo } from "../../../utils/helpers";

export const getIntouchSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNo: z.string().refine((value) => isValidPhoneNo(value), {
    message: "invalid",
  }),
  message: z.string(),
});

export const newsletterSchema = z.object({
  email: z.string().email(),
});

// case study schema

export const caseStudyschema = z.object({
  topic: z.string(),
  about: z.string(),
  postImage: z.string(),
  projectOverview: z.string(),
  Oursolution: z.string(),
  name: z.string(),
  category: z.string(),
  projecttimeline: z.string(),
  services: z.string(),
});