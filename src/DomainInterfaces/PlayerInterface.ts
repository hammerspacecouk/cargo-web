import ScoreInterface from "./ScoreInterface";

export default interface PlayerInterface {
  id: string;
  colour: string;
  startedAt: string;
  score?: ScoreInterface;
};
