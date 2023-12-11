export * from "./access-control-manager/acm.decorator";
export * as Client from "./client";
import AcmClient from "./access-control-manager/acm-client.guard";
export declare const AccessControlManager: typeof AcmClient;
export declare const AccessTokenManager: {
    generate: (userId: string | number, payload: object, userAgent: string) => string;
    verify: (accessToken: string, userAgent: string) => any;
};
