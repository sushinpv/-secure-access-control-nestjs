import { SetMetadata } from '@nestjs/common';

export const AcmPublic = () => SetMetadata('isAcmPublic', true);

export const AcmService = () => SetMetadata('IsAcmService', true);

export const AcmDisable = () => SetMetadata('IsAcmDisable', true);

import { Request as HttpRequest } from 'express';

interface AuthJwtPayload {
  user: any;
}
export type AuthRequest = HttpRequest & { auth: AuthJwtPayload };
