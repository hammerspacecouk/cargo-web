import {Score} from "./Score";

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

export class User {
    public id: string;
    public cookies:  UserCookie[];
    public score?: Score;

    constructor(id: string, cookies: UserCookie[], score?: Score) {
        this.id = id;
        this.cookies = cookies;
        this.score = score;
    };
}
