export declare enum HttpClient {
    MOBILE = "mobile",
    WEB_MOBILE = "web-mobile",
    WEB = "web",
    SERVER = "server"
}
export declare enum HttpMethod {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
    PATCH = "patch",
    DEFAULT = "get"
}
export type JsonObject = {
    [key: string]: number | boolean | string | JsonObject;
};
export type CreateRequest = (baseURL: string, url: string, method: HttpMethod, requestFrom: HttpClient, token?: string | null, data?: JsonObject | null, timeout?: number | null, onUploadProgress?: any, onDownloadProgress?: any) => AcmRequest;
export type AcmRequest = {
    baseURL: string;
    headers: {
        "x-user-agent": string;
        authorization?: string;
        "x-hash"?: string;
        "x-request-from"?: string;
    };
    method: HttpMethod;
    url: string;
    data?: JsonObject;
    timeout?: number;
    onUploadProgress?: any;
    onDownloadProgress?: any;
};
export declare const createRequest: CreateRequest;
