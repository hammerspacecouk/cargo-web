import { IActionToken } from "../../interfaces";
import { IAPIClient } from "../ApiClient";
import { Environment } from "../environment";
import { Logger } from "../Logger";
import { routes } from "../../routes";

export class BrowserClient implements IAPIClient {
  public tokenFetch(token: IActionToken): Promise<any> {
    return this.fetch(token.path, { token: token.token });
  }

  public async fetch(path: string, payload?: object): Promise<any> {
    const url = this.getUrl(path);
    const start = Date.now();

    const headers: HeadersInit = new Headers({ accept: "application/json" });
    const options: RequestInit = {
      credentials: "include",
      method: "GET",
    };

    if (payload) {
      options.method = "POST";
      options.body = JSON.stringify(payload);
      headers.append("content-type", "application/json");
    }

    const response = await fetch(url, { ...options, headers });

    const time = Date.now() - start;
    Logger.info(`[DATA_CLIENT] [FETCH] [${response.status}] [${time}ms] ${url}`);

    if (response.status === 409) {
      // you tried to perform an action you weren't allowed to perform. CHEAT!
      window.location.href = routes.getAboutCheating();
      return null;
    }
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      Logger.info(`[DATA_CLIENT] [FETCH ERROR] ${url}`);
      const message = await response.text();
      throw {
        message,
        statusCode: response.status,
      };
    }

    return await response.json();
  }

  private getUrl(path: string): string {
    return Environment.clientApiHostname + path;
  }
}
