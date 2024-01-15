import { SetMetadata } from "@nestjs/common";

export const AcmPublic = () => SetMetadata("IsAcmPublic", true);

export const AcmWebhook = () => SetMetadata("IsAcmWebhook", true);

export const AcmService = () => SetMetadata("IsAcmService", true);

export const AcmDisable = () => SetMetadata("IsAcmDisable", true);

export const AcmHealth = () => SetMetadata("IsAcmHealth", true);

import { Request as HttpRequest } from "express";

interface AuthJwtPayload {
  user: any;
}
export type AuthRequest = HttpRequest & { auth: AuthJwtPayload };
