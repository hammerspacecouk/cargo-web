import { BrowserClient } from "./HttpClient/BrowserClient";
import { ServerClient } from "./HttpClient/ServerClient";
import { isClient, isServer } from "./Runtime";
import { ActionTokenInterface } from "../Interfaces";

export interface APIClientInterface {
  getUrl(path: string): string;
  fetch(path: string, payload?: object, cookies?: object): Promise<any>;
  tokenFetch(token: ActionTokenInterface): Promise<any>;
}

export interface ErrorResponseInterface {
  statusCode: number;
  message: string;
}

let httpClient: APIClientInterface;

if (isClient) {
  httpClient = new BrowserClient();
} else if (isServer) {
  httpClient = new ServerClient();
}

if (!httpClient) {
  throw "Unknown Runtime";
}

export const ApiClient = httpClient;
