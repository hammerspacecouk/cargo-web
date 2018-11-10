import CacheControl from "./CacheControlHelper";
import { ApiClient, APIClientInterface } from "../ApiClient";
import { Logger } from "../Logger";
import { Environment } from "../Environment";
import ActionTokenInterface from "../../interfaces/ActionTokenInterface";

interface StoredUrlData {
  expires: any;
  data: object;
}

export default class implements APIClientInterface {
  private readonly cachePrefix: string = "cargo-data-";
  private readonly canStore: boolean;

  constructor() {
    // just in case the user has disabled it or private browsing or something
    this.canStore = "sessionStorage" in window;
  }

  getCacheKey(path: string): string {
    return this.cachePrefix + path;
  }

  getFromCache(key: string): object {
    if (!this.canStore) {
      return null;
    }
    const storedData: string = window.sessionStorage.getItem(key);
    if (storedData) {
      const result: StoredUrlData = JSON.parse(storedData);

      const now = Date.now(); // todo - use date-fns and centralise application time for client-side?
      if (result.expires > now) {
        // still valid in the cache
        return result.data;
      }

      // expired. delete it
      window.sessionStorage.removeItem(key);
    }
  }

  setInCache(key: string, value: object, cacheControl: CacheControl): void {
    if (!this.canStore || !cacheControl.isCacheable()) {
      return null;
    }
    const stored: StoredUrlData = {
      expires: cacheControl.getExpires(Date.now()),
      data: value
    };
    sessionStorage.setItem(key, JSON.stringify(stored));
  }

  getUrl(path: string): string {
    return Environment.apiHostname + path;
  }

  tokenFetch(token: ActionTokenInterface): Promise<any> {
    return this.fetch(token.path, { token: token.token })
  }

  async fetch(path: string, payload?: object): Promise<any> {
    const key: string = this.getCacheKey(path);

    const stored = !payload ? this.getFromCache(key) : null; // bypass the cache for POST requests
    if (stored) {
      return stored;
    }

    const url = this.getUrl(path);
    const start = Date.now();

    let options: any = {
      credentials: "include",
      method: "GET",
      headers: { accept: "application/json" }
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
        statusCode: response.status,
        message: text
      };
    }

    const data = await response.json();

    const cacheControl = response.headers.get("cache-control");

    this.setInCache(key, data, new CacheControl(cacheControl));
    return data;
  }
}
