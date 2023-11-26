"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const atm_core_1 = require("./atm-core");
const sha256 = require("sha256");
const accessControlService = {
    auth: (req) => {
        var _a;
        const accessToken = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!accessToken || accessToken === "")
            throw new common_1.UnauthorizedException({ message: "access token is missing" });
        try {
            const user = atm_core_1.default.verify(accessToken, req.headers["user-agent"]);
            req.auth = { user: user };
            return true;
        }
        catch (ex) {
            throw new common_1.UnauthorizedException();
        }
    },
    client: (req) => {
        const method = (req.method + "").toLowerCase();
        const url = req.originalUrl.startsWith("/") ? req.originalUrl.replace("/", "") : req.originalUrl;
        const requestData = {
            baseURL: process.env.BASE_URL,
            headers: { "x-user-agent": req.headers["x-user-agent"] },
            method: method,
            url: url,
        };
        const accessToken = req.headers["authorization"] || null;
        if (accessToken)
            requestData.headers.authorization = accessToken;
        const requestHash = sha256(JSON.stringify(requestData));
        if (requestHash !== req.headers["x-hash"])
            throw new common_1.ForbiddenException();
        return true;
    },
    service: (req) => {
        if (req.headers.authorization !== process.env.SERVICE_AUTHORIZATION_TOKEN) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    },
};
exports.default = accessControlService;
