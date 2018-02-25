import RankInterface from "./RankInterface";
import ScoreInterface from "./ScoreInterface";

export default interface PlayerInterface {
    id: string;
    colour: string;
    score?: ScoreInterface;
    rank?: RankInterface;
}
