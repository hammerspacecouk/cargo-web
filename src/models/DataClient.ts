import {UserInterface, UserCookie} from "./User";
import CacheControl from "../helpers/CacheControl";

interface StoredUrlData {
    expires: any,
    data: object
}

export default class {
    private cachePrefix: string = 'cargo-data-';
    private apiHost: string;
    private canStore: boolean;
    private logger: Console;

    constructor(apiHost: string, logger: Console) {
        this.apiHost = apiHost;
        this.logger = logger;
        this.canStore = (typeof window !== 'undefined' && 'sessionStorage' in window);
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

            const now = Date.now();
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

    async fetchData(path: string, user?: UserInterface): Promise<any>  {
        const key: string = this.getCacheKey(path);

        const stored = this.getFromCache(key);
        if (stored) {
            return stored;
        }

        const url = this.apiHost + path;
        try {
            const start = Date.now();

            let headers = {};
            if (user) {
                headers = {
                    cookie: user.cookies.map((cookie: UserCookie): string => {
                        return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value);
                    }).join(';'),
                };
            }

            const response = await fetch(url, {
                credentials: 'include',
                headers
            });

            const time = Date.now() - start;
            this.logger.info(`[DATACLIENT] [FETCH] [${response.status}] [${time}ms] ${url}`);

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
            this.logger.info(`[DATACLIENT] [FETCH ERROR] ${url}`);
            throw e;
        }
    }
}
