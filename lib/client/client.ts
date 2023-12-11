import * as sha256 from "sha256";
import { UUID } from "./uuid";

const xUserAgent = UUID();

export enum HttpClient {
  MOBILE = "mobile",
  WEB_MOBILE = "web-mobile",
  WEB = "web",
  SERVER = "server",
}

export enum HttpMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
  DEFAULT = "get",
}

const AUTH_TOKEN_PREFIX = "Bearer ";

export type JsonObject = {
  [key: string]: number | boolean | string | JsonObject;
};

type CreateRequestParams = {
  baseURL: string;
  url: string;
  method: HttpMethod;
  requestFrom: HttpClient;
  token: string | null;
  data?: JsonObject | null;
  timeout?: number | null;
  onUploadProgress?: any;
  onDownloadProgress?: any;
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

export const createRequest: CreateRequest = (baseURL, url, method = HttpMethod.GET, requestFrom, token = null, data = null, timeout = null, onUploadProgress = null, onDownloadProgress = null) => {
  let headers = {
    "x-user-agent": xUserAgent,
  };

  let request: AcmRequest = {
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
