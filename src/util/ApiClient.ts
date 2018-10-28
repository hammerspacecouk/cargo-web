import BrowserClient from "./HttpClient/BrowserClient";
import ServerClient from "./HttpClient/ServerClient";
import { isClient, isServer } from "./Runtime";

export interface APIClientInterface {
  getUrl(path: string): string;
  fetch(path: string, payload?: object, cookies?: object): Promise<any>;
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
