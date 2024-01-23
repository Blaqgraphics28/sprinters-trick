"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCaseStudySchema = void 0;
const zod_1 = require("zod");
exports.createCaseStudySchema = zod_1.z.object({
    projectTitle: zod_1.z.string(),
    projectSubtitle: zod_1.z.string(),
    projectDescription: zod_1.z.string(),
    projectOverview: zod_1.z.string(),
    problem: zod_1.z.string(),
    solution: zod_1.z.string(),
    clientName: zod_1.z.string(),
    projectTimeline: zod_1.z.string(),
    projectCategory: zod_1.z.string(),
    servicesProvides: zod_1.z.string(),
    coverPhoto: zod_1.z.object({
        imageId: zod_1.z.string(),
        imageUrl: zod_1.z.string(),
    }),
});
//# sourceMappingURL=caseStudy.policies.js.map