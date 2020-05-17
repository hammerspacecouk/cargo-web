const fetch = require("node-fetch");
import http from "http";
import { IActionToken } from "../../interfaces";
import { IAPIClient } from "../ApiClient";
import { Environment } from "../environment";
import { Logger } from "../Logger";
import { UnauthenticatedError } from "./Error";

export const AUTH_COOKIE_NAME = "AUTHENTICATION_TOKEN";

export class ServerClient implements IAPIClient {
  public tokenFetch(token: IActionToken): Promise<any> {
    return this.fetch(token.path, { token: token.token });
  }

  public async fetch(
    path: string,
    payload?: object,
    incomingRequest?: http.IncomingMessage,
    outgoingResponse?: http.ServerResponse
  ): Promise<any> {
    const url = this.getUrl(path);
    try {
      const headers: any = { accept: "application/json" };
      const options: RequestInit = {
        method: "GET",
        credentials: "include",
      };

      if (payload) {
        options.method = "POST";
        options.body = JSON.stringify(payload);
        headers["content-type"] = "application/json";
      }

      if (incomingRequest?.headers?.cookie) {
        headers.cookie = incomingRequest.headers.cookie;
      }

      const start = Date.now();
      const response = await fetch(url, { ...options, headers });
      const time = Date.now() - start;
      Logger.info(`[DATA_CLIENT] [FETCH] ${response.status} ${time}ms ${url}`);

      const cacheControl = response.headers.get("cache-control");

      if (outgoingResponse && cacheControl) {
        outgoingResponse.setHeader("cache-control", cacheControl);
      }

      if (response.status === 401) {
        throw UnauthenticatedError("Not authenticated");
      }
      if (response.status === 403) {
        // you don't have access to this. might need to login or not allowed
        return null;
      }
      if (response.status === 404 || response.status === 410) {
        if (outgoingResponse) {
          outgoingResponse.statusCode = response.status;
        }
        return null;
      }
      if (response.status === 409) {
        // didn't exist - todo - cheating
        return null;
      }
      if (!response.ok) {
        // todo - all other errors (perhaps split by 4xx/5xx)
        return null;
      }

      return await response.json();
    } catch (e) {
      Logger.info(`[DATA_CLIENT] [FETCH ERROR] ${url} ${e.message}`);
      throw e;
    }
  }

  private getUrl(path: string): string {
    return Environment.serverApiHostname + path;
  }
}
