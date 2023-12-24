"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const helpers_1 = require("../../utils/helpers");
const router = (0, express_1.Router)();
router.get("/", (_req, res) => {
    (0, helpers_1.handleResponse)({
        res,
        message: "welcome to the Sprinters!",
    });
});
const v1Routers = router;
exports.default = v1Routers;
//# sourceMappingURL=v1Routes.js.map