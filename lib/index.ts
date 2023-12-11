export * from "./access-control-manager/acm.decorator";
export * as Client from "./client";

import AcmClient from "./access-control-manager/acm-client.guard";
import AccessTokenCore from "./core/atm-core";

export const AccessControlManager = AcmClient;
export const AccessTokenManager = AccessTokenCore;
