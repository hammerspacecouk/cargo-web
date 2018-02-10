import {APIClientInterface} from "./index";

export default class implements APIClientInterface {
    private apiHostname: string;
    private console: Console;
    private userCookies: string[];

    constructor(apiHostname: string, userCookies: string[], console: Console) {
        this.apiHostname = apiHostname;
        this.console = console;
        this.userCookies = userCookies; // todo - store the real cookies
    }

    getUrl(path: string): string {
        return this.apiHostname + path;
    }

    async fetch(path: string): Promise<any>  {
        const url = this.getUrl(path);
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
            if (response.status !== 200) {
                // todo - all other errors (perhaps split by 4xx/5xx)
                return null;
            }


            return response.json();
        } catch (e) {
            this.console.info(`[DATACLIENT] [FETCH ERROR] ${url}`);
            throw e;
        }
    }
}
