interface StoredUrlData {
    expires: any,
    data: object
}

export default class {
    private cachePrefix: string = 'cargo-data-';
    private apiHost: string;
    private canStore: boolean;

    constructor(apiHost: string) {
        this.apiHost = apiHost;
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

            // todo - store a cache time, and ignore if it has expired
            return result.data;
        }
    }

    setInCache(key: string, value: object, age: number): void {
        if (!this.canStore) {
            return null;
        }
        const stored: StoredUrlData = {
            expires: null, // todo - get from the response header
            data: value
        };
        sessionStorage.setItem(key, JSON.stringify(stored));
    }

    async fetchData(path: string): Promise<any>  {
        const key: string = this.getCacheKey(path);

        const stored = this.getFromCache(key);
        if (stored) {
            return stored;
        }

        try {
            const response = await fetch(this.apiHost + path, {
                credentials: 'include'
            });
            const data = await response.json();
            // response.headers.get()

            this.setInCache(key, data, 10); // todo - read from max-age
            return data;

        } catch (e) {
            // todo - try again, and fall back to browser reload?
            throw 'Fetch failed';
        }
    }
}
