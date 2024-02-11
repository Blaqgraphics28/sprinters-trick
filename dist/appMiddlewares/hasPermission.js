"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../utils/response");
function grantAccess(roles) {
    return (req, res, next) => {
        const { userAuth } = req;
        if (roles.includes(userAuth.role)) {
            next();
        }
        else {
            return (0, response_1.handleResponse)({
                res,
                status: 401,
                message: `${userAuth.role}s are not authorized to perform this operation`,
            });
        }
    };
}
exports.default = grantAccess;
//# sourceMappingURL=hasPermission.js.map