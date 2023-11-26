import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { AccessTokenManager } from '@secure-access-control';
import { Request } from 'express';
import * as sha256 from 'sha256';

/**
 * accessControlManager Middleware to verify auth token and to verify client access
 */
const accessControlService = {
  /**
   * Middleware to verify the access token
   * @returns
   */
  auth: (req: any) => {
    const accessToken = req.headers['authorization']?.replace('Bearer ', '');
    if (!accessToken || accessToken === '')
      throw new UnauthorizedException({ message: 'access token is missing' });

    try {
      const user = AccessTokenManager.verify(
        accessToken,
        req.headers['user-agent'],
      );
      req.auth = { user: user };
      return true;
    } catch (ex) {
      throw new UnauthorizedException();
    }
  },

  /**
   * Middleware to check the hash key verification
   */
  client: (req: Request) => {
    const method = (req.method + '').toLowerCase();
    const url = req.originalUrl.startsWith('/')
      ? req.originalUrl.replace('/', '')
      : req.originalUrl;

    const requestData: any = {
      baseURL: process.env.BASE_URL,
      headers: { 'x-user-agent': req.headers['x-user-agent'] },
      method: method,
      url: url,
    };

    const accessToken = req.headers['authorization'] || null;
    if (accessToken) requestData.headers.authorization = accessToken;

    const requestHash = sha256(JSON.stringify(requestData));
    if (requestHash !== req.headers['x-hash']) throw new ForbiddenException();
    return true;
  },

  /**
   * Function which is used to validate a service route
   */
  service: (req: Request) => {
    if (req.headers.authorization !== process.env.SERVICE_AUTHORIZATION_TOKEN) {
      throw new UnauthorizedException();
    }
    return true;
  },
};

export default accessControlService;
