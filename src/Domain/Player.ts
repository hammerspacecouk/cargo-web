import {Score} from "./Score";

export class Player {
    public id: string;
    public score?: Score;

    constructor(id: string, score: Score) {
        this.id = id;
        this.score = score;
    };
}
