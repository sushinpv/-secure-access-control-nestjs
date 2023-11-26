"use strict";

import * as jwt from "jsonwebtoken";
import * as sha256 from "sha256";

const ACM_JWT_SECRET_KEY = process.env.ACM_JWT_SECRET_KEY || "qW3L4CgVH9LlNBA20DppJmeMiiEEmxIBdro85Rf1cTzGcRVYH14GtLZw4hwJUFbW";
const ACM_TOKEN_LIFETIME = process.env.ACM_TOKEN_LIFETIME || "10min";
const ACM_TOKEN_ISSUER = process.env.ACM_TOKEN_ISSUER || "example.com";

/**
 * JWT library wrapper
 */
const JWTService = {
  /**
   * Function which is used to create a jwt token
   * @param {*} payload
   * @returns
   */
  generate(payload: object) {
    return jwt.sign(payload, ACM_JWT_SECRET_KEY, {
      expiresIn: ACM_TOKEN_LIFETIME,
      issuer: ACM_TOKEN_ISSUER,
    });
  },

  /**
   * Function which is used to verify the jwt token
   * @param { string } token
   */
  decode(token: string) {
    return jwt.verify(token, ACM_JWT_SECRET_KEY);
  },
};

/**
 * Access token manager which is used to create and verify access token
 * Function will `throw` error incase its unable to create an access token
 */
const AccessTokenManager = {
  /**
   * Function which is used to create access token
   * @param { string } userId
   * @param { Object } payload
   * @param { string } userAgent
   */
  generate: (userId: string | number, payload: object, userAgent: string) => {
    const token = JWTService.generate({ ...payload, client: userId });
    userAgent = sha256(userAgent);
    const tokenHash = sha256(`${token}.${userId}.${userAgent}`);
    const accessToken = `${token}.${tokenHash}`;
    return accessToken;
  },

  /**
   * Function which is used to verify access token
   * Function will return verified jwt token data, if its able to verify, otherwise it throw's error
   * @param { string } accessToken
   * @param { string } userAgent
   */
  verify: (accessToken: string, userAgent: string) => {
    const tokenArray = accessToken.split(".");
    if (tokenArray.length == 0) throw { statusCode: 498, message: "Logout" };

    const requestTokenHash = tokenArray.pop();
    const token = tokenArray.join(".");
    const decodedToken: any = JWTService.decode(token);

    if (!decodedToken.client) throw { statusCode: 498, message: "Logout" };

    userAgent = sha256(userAgent);
    const tokenHash = sha256(`${token}.${decodedToken.client}.${userAgent}`);
    if (requestTokenHash !== tokenHash) throw { statusCode: 498, message: "Logout" };

    return decodedToken;
  },
};

export default AccessTokenManager;
