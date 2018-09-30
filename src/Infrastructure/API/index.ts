import BrowserClient from "./BrowserClient";
import ServerClient from "./ServerClient";
import { isClient, isServer } from "../../Utils/Runtime";

export interface APIClientInterface {
  getUrl(path: string): string;
  fetch(path: string, payload?: object, cookies?: object): Promise<any>;
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

export default httpClient;
