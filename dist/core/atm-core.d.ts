declare const AccessTokenManager: {
    generate: (userId: string | number, payload: object, userAgent: string) => string;
    verify: (accessToken: string, userAgent: string) => any;
};
export default AccessTokenManager;
