"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const caseStudySchema = new mongoose_1.Schema({
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
}, { timestamps: true });
const CaseStudyModel = (0, mongoose_1.model)("CaseStudy", caseStudySchema);
exports.default = CaseStudyModel;
//# sourceMappingURL=caseStudy.model.js.map