import DataClient from "./DataClient";

export interface UserCookie {
    name: string;
    value: string;
    opts?: {
        maxAge?: number;
        domain: string;
        httpOnly: boolean;
        path: string;
        secure: boolean;
    }
}

export interface UserInterface {
    id: string,
    cookies: UserCookie[]
}

export default class {
    private dataClient: DataClient;
    private logger: Console;

    constructor(
        dataClient: DataClient,
        logger: Console
    ) {
        this.dataClient = dataClient;
        this.logger = logger;
    }

    async init(cookies?: {[key: string] : string}): Promise<UserInterface> {
        // make a user to get started with the initial cookies
        let user = null;
        if (cookies) {
            user = {
                id: '',
                cookies: Object.keys(cookies).map((key: string): UserCookie => {
                    const value: string = cookies[key];
                    return {
                        name: key,
                        value
                    }
                }),
            };
        }
        return await this.dataClient.fetchData('/login/check', user);
    }
}
