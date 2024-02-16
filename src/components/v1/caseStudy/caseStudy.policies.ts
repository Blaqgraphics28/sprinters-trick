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
});

export const editCaseStudySchema = z.object({
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
  imageId: z.string(),
  caseStudyId: z.string(),
});