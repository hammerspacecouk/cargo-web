import ScoreInterface from "./ScoreInterface";

export default interface PlayerInterface {
  id: string;
  colour: string; // todo -remove
  emblem: string;
  startedAt: string;
  score?: ScoreInterface;
}
