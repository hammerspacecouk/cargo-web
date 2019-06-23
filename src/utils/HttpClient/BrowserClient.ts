import { IActionToken } from "../../interfaces";
import { IAPIClient } from "../ApiClient";
import { Environment } from "../environment";
import { Logger } from "../Logger";

export class BrowserClient implements IAPIClient {
  public tokenFetch(token: IActionToken): Promise<any> {
    return this.fetch(token.path, { token: token.token });
  }

  public async fetch(path: string, payload?: object): Promise<any> {
    const url = this.getUrl(path);
    const start = Date.now();

    const options: any = {
      credentials: "include",
      headers: { accept: "application/json" },
      method: "GET",
    };

    if (payload) {
      options.method = "POST";
      options.body = JSON.stringify(payload);
      options.headers["content-type"] = "application/json";
    }

    const response = await fetch(url, options);

    const time = Date.now() - start;
    Logger.info(`[DATACLIENT] [FETCH] [${response.status}] [${time}ms] ${url}`);

    if (response.status === 409) {
      // you tried to perform an action you weren't allowed to perform. CHEAT!
      window.location.href = "/about/cheating";
      return null;
    }
    if (response.status === 404) {
      return null;
    }
    if (response.status !== 200) {
      const text = await response.text();
      Logger.info(`[DATACLIENT] [FETCH ERROR] ${url}`);
      throw {
        message: text,
        statusCode: response.status,
      };
    }

    return response.json();
  }

  private getUrl(path: string): string {
    return Environment.clientApiHostname + path;
  }
}
