"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntouchSchema = void 0;
const zod_1 = require("zod");
const helpers_1 = require("../../../utils/helpers");
exports.getIntouchSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phoneNo: zod_1.z.string().refine((value) => (0, helpers_1.isValidPhoneNo)(value), {
        message: "invalid",
    }),
    message: zod_1.z.string(),
});
//# sourceMappingURL=user.policies.js.map