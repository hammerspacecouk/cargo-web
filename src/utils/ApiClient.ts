import http from "http";
import { IActionToken } from "../interfaces";
import { BrowserClient } from "./HttpClient/BrowserClient";
import { ServerClient } from "./HttpClient/ServerClient";
import { isClient, isServer } from "./runtime";

export interface IAPIClient {
  fetch(
    path: string,
    payload?: object,
    headers?: http.IncomingHttpHeaders,
    response?: http.ServerResponse
  ): Promise<any>;
  tokenFetch(token: IActionToken): Promise<any>;
}

let httpClient: IAPIClient;

if (isClient) {
  httpClient = new BrowserClient();
} else if (isServer) {
  httpClient = new ServerClient();
} else {
  throw new Error("Unknown Runtime");
}

export const ApiClient = httpClient;
