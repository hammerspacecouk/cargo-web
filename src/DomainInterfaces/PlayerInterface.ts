import RankInterface from "./RankInterface";

export default interface PlayerInterface {
    id: string;
    colour: string;
    rank?: RankInterface;
}
