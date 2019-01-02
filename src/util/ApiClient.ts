import { IActionToken } from "../Interfaces";
import { BrowserClient } from "./HttpClient/BrowserClient";
import { ServerClient } from "./HttpClient/ServerClient";
import { isClient, isServer } from "./Runtime";

export interface IAPIClient {
  getUrl(path: string): string;
  fetch(path: string, payload?: object, cookies?: object): Promise<any>;
  tokenFetch(token: IActionToken): Promise<any>;
}

let httpClient: IAPIClient;

if (isClient) {
  httpClient = new BrowserClient();
} else if (isServer) {
  httpClient = new ServerClient();
}

if (!httpClient) {
  throw new Error("Unknown Runtime");
}

export const ApiClient = httpClient;
