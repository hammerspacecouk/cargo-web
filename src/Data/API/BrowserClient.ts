import CacheControl from "./CacheControlHelper";
import {APIClientInterface} from "./index";

interface StoredUrlData {
    expires: any,
    data: object
}

export default class implements APIClientInterface {
    private cachePrefix: string = 'cargo-data-';
    private canStore: boolean;
    private apiHostname: string;
    private console: Console;

    constructor(apiHostname: string, console: Console) {
        // just in case the user has disabled it or private browsing or something
        this.canStore = ('sessionStorage' in window);
        this.apiHostname = apiHostname;
        this.console = console;
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

            const now = Date.now(); // todo - use moment and centralise application time for client-side?
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

    async fetch(path: string): Promise<any>  {
        const key: string = this.getCacheKey(path);

        const stored = this.getFromCache(key);
        if (stored) {
            return stored;
        }

        const url = this.apiHostname + path;
        try {
            const start = Date.now();

            const response = await fetch(url, {
                credentials: 'include'
            });

            const time = Date.now() - start;
            this.console.info(`[DATACLIENT] [FETCH] [${response.status}] [${time}ms] ${url}`);

            if (response.status === 403) {
                // you don't have access to this. might need to login or not allowed
                return null;
            }
            if (response.status === 404) {
                // didn't exist - todo - differentiate from 403
                return null;
            }

            const data = await response.json();

            const cacheControl = response.headers.get('cache-control');

            this.setInCache(key, data, new CacheControl(cacheControl));
            return data;

        } catch (e) {
            this.console.info(`[DATACLIENT] [FETCH ERROR] ${url}`);
            throw e;
        }
    }
}
