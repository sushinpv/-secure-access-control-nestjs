export * from './access-control-manager/acm.decorator';

import AcmClient from './access-control-manager/acm-client.guard';
import AccessTokenLib from './access-token-manager/atc-lib';

export const AccessControlManager = AcmClient;
export const AccessTokenManager = AccessTokenLib;
