"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createCaseStudy_1 = __importDefault(require("./caseStudyActions/createCaseStudy"));
const caseStudy_policies_1 = require("./caseStudy.policies");
const policy_middlewares_1 = __importDefault(require("../../../appMiddlewares/policy.middlewares"));
const getCaseStudy_1 = __importDefault(require("./caseStudyActions/getCaseStudy"));
const deleteCaseStudy_1 = __importDefault(require("./caseStudyActions/deleteCaseStudy"));
const fileUpload_config_1 = require("../../../configs/fileUpload.config");
const validateToken_1 = __importDefault(require("../../../appMiddlewares/validateToken"));
const requireAuth_1 = __importDefault(require("../../../appMiddlewares/requireAuth"));
const hasPermission_1 = __importDefault(require("../../../appMiddlewares/hasPermission"));
const editCaseStudy_1 = __importDefault(require("./caseStudyActions/editCaseStudy"));
const imgeUpload_1 = require("../../../appMiddlewares/imgeUpload");
const router = (0, express_1.Router)();
router.post("/", fileUpload_config_1.upload.single("cover_photo"), (0, policy_middlewares_1.default)(caseStudy_policies_1.createCaseStudySchema), validateToken_1.default, requireAuth_1.default, (0, hasPermission_1.default)(["admin"]), imgeUpload_1.uploadImageMiddleware, createCaseStudy_1.default);
router.get("/", getCaseStudy_1.default);
router.patch("/update", fileUpload_config_1.upload.single("cover_photo"), (0, policy_middlewares_1.default)(caseStudy_policies_1.editCaseStudySchema), validateToken_1.default, requireAuth_1.default, (0, hasPermission_1.default)(["admin"]), imgeUpload_1.uploadImageMiddleware, editCaseStudy_1.default);
router.delete("/", validateToken_1.default, requireAuth_1.default, (0, hasPermission_1.default)(["admin"]), deleteCaseStudy_1.default);
const caseStudyRouter = router;
exports.default = caseStudyRouter;
//# sourceMappingURL=caseStudy.routes.js.map