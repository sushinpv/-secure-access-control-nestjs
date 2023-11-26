export * from "./access-control-manager/acm.decorator";

import AcmClient from "./access-control-manager/acm-client.guard";
import AccessTokenCore from "./core/atm-core";

export const AccessControlManager = AcmClient;
export const AccessTokenManager = AccessTokenCore;
