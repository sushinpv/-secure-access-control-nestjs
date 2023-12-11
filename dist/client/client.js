"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequest = exports.HttpMethod = exports.HttpClient = void 0;
const sha256 = require("sha256");
const uuid_1 = require("./uuid");
const xUserAgent = (0, uuid_1.UUID)();
var HttpClient;
(function (HttpClient) {
    HttpClient["MOBILE"] = "mobile";
    HttpClient["WEB_MOBILE"] = "web-mobile";
    HttpClient["WEB"] = "web";
    HttpClient["SERVER"] = "server";
})(HttpClient || (exports.HttpClient = HttpClient = {}));
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "get";
    HttpMethod["POST"] = "post";
    HttpMethod["PUT"] = "put";
    HttpMethod["DELETE"] = "delete";
    HttpMethod["PATCH"] = "patch";
    HttpMethod["DEFAULT"] = "get";
})(HttpMethod || (exports.HttpMethod = HttpMethod = {}));
const AUTH_TOKEN_PREFIX = "Bearer ";
const createRequest = (baseURL, url, method = HttpMethod.GET, requestFrom, token = null, data = null, timeout = null, onUploadProgress = null, onDownloadProgress = null) => {
    let headers = {
        "x-user-agent": xUserAgent,
    };
    let request = {
        baseURL: baseURL,
        headers: headers,
        method,
        url,
    };
    if (token) {
        request.headers.authorization = AUTH_TOKEN_PREFIX + token;
    }
    let requestHash = sha256(JSON.stringify(request));
    request.headers["x-hash"] = requestHash;
    request.headers["x-request-from"] = requestFrom;
    if (data) {
        request.data = data;
    }
    if (timeout) {
        request.timeout = timeout;
    }
    if (onUploadProgress) {
        request.onUploadProgress = onUploadProgress;
    }
    if (onDownloadProgress) {
        request.onDownloadProgress = onDownloadProgress;
    }
    return request;
};
exports.createRequest = createRequest;
