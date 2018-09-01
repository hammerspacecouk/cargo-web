import ScoreInterface from "./ScoreInterface";
import RankStatusInterface from "./RankStatusInterface";

export default interface PlayerInterface {
  id: string;
  colour: string;
  score?: ScoreInterface;
  rankStatus?: RankStatusInterface;
};
