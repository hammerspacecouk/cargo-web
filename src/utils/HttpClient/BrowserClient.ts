import axios from "axios";
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

    const options: any = {
      url,
      withCredentials: true,
      headers: { accept: "application/json" },
      method: "get",
      validateStatus: function(status: number) {
        return status >= 200 && status < 500; // default
      },
    };

    if (payload) {
      options.method = "post";
      options.data = payload;
      options.headers["content-type"] = "application/json";
    }

    const response = await axios(options);

    const time = Date.now() - start;
    Logger.info(`[DATACLIENT] [FETCH] [${response.status}] [${time}ms] ${url}`);

    if (response.status === 409) {
      // you tried to perform an action you weren't allowed to perform. CHEAT!
      window.location.href = routes.getAboutCheating();
      return null;
    }
    if (response.status === 404) {
      return null;
    }
    if (response.status !== 200) {
      Logger.info(`[DATACLIENT] [FETCH ERROR] ${url}`);
      throw {
        message: response.data,
        statusCode: response.status,
      };
    }

    return response.data;
  }

  private getUrl(path: string): string {
    return Environment.clientApiHostname + path;
  }
}
