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
const uploadImage_1 = require("../upload/uploadImage");
const validateToken_1 = __importDefault(require("../../../appMiddlewares/validateToken"));
const requireAuth_1 = __importDefault(require("../../../appMiddlewares/requireAuth"));
const hasPermission_1 = __importDefault(require("../../../appMiddlewares/hasPermission"));
const editCaseStudy_1 = __importDefault(require("./caseStudyActions/editCaseStudy"));
const router = (0, express_1.Router)();
router.post("/", (0, policy_middlewares_1.default)(caseStudy_policies_1.createCaseStudySchema), validateToken_1.default, requireAuth_1.default, (0, hasPermission_1.default)(["admin"]), createCaseStudy_1.default);
router.get("/", getCaseStudy_1.default);
router.patch("/update/:id", (0, policy_middlewares_1.default)(caseStudy_policies_1.createCaseStudySchema), validateToken_1.default, requireAuth_1.default, (0, hasPermission_1.default)(["admin"]), editCaseStudy_1.default);
router.delete("/:caseStudyId", validateToken_1.default, requireAuth_1.default, (0, hasPermission_1.default)(["admin"]), deleteCaseStudy_1.default);
router.post("/upload/image", validateToken_1.default, requireAuth_1.default, (0, hasPermission_1.default)(["admin"]), fileUpload_config_1.upload.single("cover-photo"), uploadImage_1.uploadImage);
const caseStudyRouter = router;
exports.default = caseStudyRouter;
//# sourceMappingURL=caseStudy.routes.js.map