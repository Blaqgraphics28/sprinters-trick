import { z } from "zod";

export const createCaseStudySchema = z.object({
  projectTitle: z.string(),
  projectSubtitle: z.string(),
  projectDescription: z.string(),
  projectOverview: z.string(),
  problem: z.string(),
  solution: z.string(),
  clientName: z.string(),
  projectTimeline: z.string(),
  projectCategory: z.string(),
  servicesProvides: z.string(),
  coverPhoto: z.object({
    imageId: z.string(),
    imageUrl: z.string(),
  }),
});
