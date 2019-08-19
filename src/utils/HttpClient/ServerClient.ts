const fetch = require("node-fetch");
import http from "http";
import { IActionToken } from "../../interfaces";
import { IAPIClient } from "../ApiClient";
import { Environment } from "../environment";
import { Logger } from "../Logger";
import { UnauthenticatedError } from "./Error";

export const AUTH_COOKIE_NAME = "AUTHENTICATION_TOKEN";

const findAuthCookie = (cookieString: string): string => {
  const bits = cookieString.split(";");
  return bits.find(bit => bit.includes(AUTH_COOKIE_NAME));
};

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

      if (incomingRequest && incomingRequest.headers && incomingRequest.headers.cookie) {
        headers["cookie"] = incomingRequest.headers.cookie;
      }

      const start = Date.now();
      const response = await fetch(url, { ...options, headers });
      const time = Date.now() - start;
      const cookieString = response.headers.get("set-cookie");
      const cacheControl = response.headers.get("cache-control");
      Logger.info(
        "[DATA_CLIENT_FETCH]",
        JSON.stringify({
          status: response.status,
          time: `${time}ms`,
          url,
          sendHeaders: headers,
          receiveCookie: cookieString,
        })
      );

      if (outgoingResponse) {
        if (cookieString) {
          outgoingResponse.setHeader("set-cookie", cookieString);
          const authCookie = findAuthCookie(cookieString);
          if (incomingRequest && authCookie) {
            incomingRequest.headers.cookie = authCookie;
          }
        }
        if (cacheControl) {
          outgoingResponse.setHeader("cache-control", cacheControl);
        }
      }

      if (response.status === 401) {
        throw UnauthenticatedError("Not authenticated");
      }
      if (response.status === 403) {
        // you don't have access to this. might need to login or not allowed
        return null;
      }
      if (response.status === 404) {
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
