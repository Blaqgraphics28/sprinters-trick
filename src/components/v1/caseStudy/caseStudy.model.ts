import { Document, Schema, model } from "mongoose";

export interface ICaseStudy extends Document {
  projectTitle: string;
  projectSubtitle: string;
  projectDescription: string;
  projectOverview: string;
  problem: string;
  solution: string;
  clientName: string;
  projectTimeline: string;
  projectCategory: string;
  servicesProvides: string;
  coverPhoto: {
    imageId: string;
    imageUrl: string;
  };
}

const caseStudySchema = new Schema<ICaseStudy>(
  {
    projectTitle: String,
    projectSubtitle: String,
    projectDescription: String,
    projectOverview: String,
    problem: String,
    solution: String,
    clientName: String,
    projectTimeline: String,
    projectCategory: String,
    servicesProvides: String,
    coverPhoto: {
      imageId: String,
      imageUrl: String,
    },
  },
  { timestamps: true }
);
const CaseStudyModel = model<ICaseStudy>("CaseStudy", caseStudySchema);

export default CaseStudyModel;
