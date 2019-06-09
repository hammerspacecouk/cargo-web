import { IActionToken } from "../../Interfaces";
import { IAPIClient } from "../ApiClient";
import { Environment } from "../Environment";
import { Logger } from "../Logger";

const passThroughCookies = (cookies?: any) => {
  if (!cookies) {
    return null;
  }

  const cookieItems = [];
  for (const property in cookies) {
    if (cookies.hasOwnProperty(property)) {
      cookieItems.push(encodeURIComponent(property) + "=" + encodeURIComponent(cookies[property]));
    }
  }
  return cookieItems.join(";");
};

export class ServerClient implements IAPIClient {
  public getUrl(path: string): string {
    return Environment.apiHostname + path;
  }

  public tokenFetch(token: IActionToken): Promise<any> {
    return this.fetch(token.path, { token: token.token });
  }

  public async fetch(path: string, payload?: object, cookies?: object): Promise<any> {
    const url = this.getUrl(path);
    try {
      const start = Date.now();

      const headers = {
        cookie: passThroughCookies(cookies),
      };

      const response = await fetch(url, { headers });

      const time = Date.now() - start;
      Logger.info(`[DATACLIENT] [FETCH] [${response.status}] [${time}ms] ${url}`);

      if (response.status === 403) {
        // you don't have access to this. might need to login or not allowed
        return null;
      }
      if (response.status === 404) {
        // didn't exist - todo - differentiate from 403
        return null;
      }
      if (response.status !== 200) {
        // todo - all other errors (perhaps split by 4xx/5xx)
        return null;
      }

      return response.json();
    } catch (e) {
      Logger.info(`[DATACLIENT] [FETCH ERROR] ${url}`);
      throw e;
    }
  }
}
