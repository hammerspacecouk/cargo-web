interface StoredUrlData {
    expires: any,
    data: object
}

export default class {
    private cachePrefix: string = 'cargo-data-';
    private apiHost: string;

    constructor(apiHost: string) {
        this.apiHost = apiHost;
    }

    getCacheKey(path: string): string {
        return this.cachePrefix + path;
    }

    async fetchData(path: string): Promise<any>  {
        const canStore = (typeof window !== 'undefined' && 'sessionStorage' in window);

        const key: string = this.getCacheKey(path);

        if (canStore) {
            const storedData: string = window.sessionStorage.getItem(key);
            if (storedData) {
                const result: StoredUrlData = JSON.parse(storedData);

                // todo - store a cache time, and ignore if it has expired
                return result.data;
            }
        }

        // todo - sort withCredentials, and to get hostname from ENV. use DI container
        const response = await fetch(this.apiHost + path);
        const data = await response.json();

        if (canStore) {
            const stored: StoredUrlData = {
                expires: null, // todo - get from the response header
                data
            };
            sessionStorage.setItem(key, JSON.stringify(stored));
        }
        return data;
    }
}
