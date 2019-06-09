import { IActionToken } from "../../Interfaces";
import { IAPIClient } from "../ApiClient";
import { Environment } from "../Environment";
import { Logger } from "../Logger";
import { CacheControlHelper } from "./CacheControlHelper";

interface IStoredUrlData {
  expires: any;
  data: object;
}

export class BrowserClient implements IAPIClient {
  private readonly cachePrefix: string = "cargo-data-";
  private readonly canStore: boolean;

  constructor() {
    // just in case the user has disabled it or private browsing or something
    this.canStore = "sessionStorage" in window;
  }

  public getCacheKey(path: string): string {
    return this.cachePrefix + path;
  }

  public getFromCache(key: string): object {
    if (!this.canStore) {
      return null;
    }
    const storedData: string = window.sessionStorage.getItem(key);
    if (storedData) {
      const result: IStoredUrlData = JSON.parse(storedData);

      const now = Date.now(); // todo - use date-fns and centralise application time for client-side?
      if (result.expires > now) {
        // still valid in the cache
        return result.data;
      }

      // expired. delete it
      window.sessionStorage.removeItem(key);
    }
  }

  public setInCache(key: string, value: object, cacheControl: CacheControlHelper): void {
    if (!this.canStore || !cacheControl.isCacheable()) {
      return null;
    }
    const stored: IStoredUrlData = {
      data: value,
      expires: cacheControl.getExpires(Date.now()),
    };
    sessionStorage.setItem(key, JSON.stringify(stored));
  }

  public getUrl(path: string): string {
    return Environment.apiHostname + path;
  }

  public tokenFetch(token: IActionToken): Promise<any> {
    return this.fetch(token.path, { token: token.token });
  }

  public async fetch(path: string, payload?: object): Promise<any> {
    const key: string = this.getCacheKey(path);

    const stored = !payload ? this.getFromCache(key) : null; // bypass the cache for POST requests
    if (stored) {
      return stored;
    }

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

    const data = await response.json();

    const cacheControl = response.headers.get("cache-control");

    this.setInCache(key, data, new CacheControlHelper(cacheControl));
    return data;
  }
}
