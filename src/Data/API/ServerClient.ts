import {APIClientInterface} from "./index";

interface StoredUrlData {
    expires: any,
    data: object
}

export default class implements APIClientInterface {
    private apiHostname: string;
    private console: Console;
    private userCookies: string[];

    constructor(apiHostname: string, userCookies: string[], console: Console) {
        this.apiHostname = apiHostname;
        this.console = console;
        this.userCookies = userCookies; // todo - store the real cookies
    }

    async fetch(path: string): Promise<any>  {
        const url = this.apiHostname + path;
        try {
            const start = Date.now();

            const headers = {
                cookie: this.userCookies.map((cookie: any): string => { // todo - UserCookie interface?
                    return encodeURIComponent(cookie.name) + '=' + encodeURIComponent(cookie.value);
                }).join(';'),
            };

            const response = await fetch(url, {headers});

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

            return response.json();
        } catch (e) {
            this.console.info(`[DATACLIENT] [FETCH ERROR] ${url}`);
            throw e;
        }
    }
}
