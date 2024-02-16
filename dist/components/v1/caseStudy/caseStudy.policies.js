"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCaseStudySchema = exports.createCaseStudySchema = void 0;
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
});
exports.editCaseStudySchema = zod_1.z.object({
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
    imageId: zod_1.z.string(),
    caseStudyId: zod_1.z.string(),
});
//# sourceMappingURL=caseStudy.policies.js.map