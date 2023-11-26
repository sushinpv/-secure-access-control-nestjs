"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const sha256 = require("sha256");
const ACM_JWT_SECRET_KEY = process.env.ACM_JWT_SECRET_KEY || "qW3L4CgVH9LlNBA20DppJmeMiiEEmxIBdro85Rf1cTzGcRVYH14GtLZw4hwJUFbW";
const ACM_TOKEN_LIFETIME = process.env.ACM_TOKEN_LIFETIME || "10min";
const ACM_TOKEN_ISSUER = process.env.ACM_TOKEN_ISSUER || "example.com";
const JWTService = {
    generate(payload) {
        return jwt.sign(payload, ACM_JWT_SECRET_KEY, {
            expiresIn: ACM_TOKEN_LIFETIME,
            issuer: ACM_TOKEN_ISSUER,
        });
    },
    decode(token) {
        return jwt.verify(token, ACM_JWT_SECRET_KEY);
    },
};
const AccessTokenManager = {
    generate: (userId, payload, userAgent) => {
        const token = JWTService.generate(Object.assign(Object.assign({}, payload), { client: userId }));
        userAgent = sha256(userAgent);
        const tokenHash = sha256(`${token}.${userId}.${userAgent}`);
        const accessToken = `${token}.${tokenHash}`;
        return accessToken;
    },
    verify: (accessToken, userAgent) => {
        const tokenArray = accessToken.split(".");
        if (tokenArray.length == 0)
            throw { statusCode: 498, message: "Logout" };
        const requestTokenHash = tokenArray.pop();
        const token = tokenArray.join(".");
        const decodedToken = JWTService.decode(token);
        if (!decodedToken.client)
            throw { statusCode: 498, message: "Logout" };
        userAgent = sha256(userAgent);
        const tokenHash = sha256(`${token}.${decodedToken.client}.${userAgent}`);
        if (requestTokenHash !== tokenHash)
            throw { statusCode: 498, message: "Logout" };
        return decodedToken;
    },
};
exports.default = AccessTokenManager;
