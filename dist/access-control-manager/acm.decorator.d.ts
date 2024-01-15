export declare const AcmPublic: () => import("@nestjs/common").CustomDecorator<string>;
export declare const AcmWebhook: () => import("@nestjs/common").CustomDecorator<string>;
export declare const AcmService: () => import("@nestjs/common").CustomDecorator<string>;
export declare const AcmDisable: () => import("@nestjs/common").CustomDecorator<string>;
export declare const AcmHealth: () => import("@nestjs/common").CustomDecorator<string>;
import { Request as HttpRequest } from "express";
interface AuthJwtPayload {
    user: any;
}
export type AuthRequest = HttpRequest & {
    auth: AuthJwtPayload;
};
export {};
