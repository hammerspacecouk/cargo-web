import ActionTokenInterface from "./ActionTokenInterface";

interface RankInterface {
  title: string;
}

export default interface RankStatusInterface {
  acknowledgeToken?: ActionTokenInterface;
  portsVisited: number;
  levelProgress: number;
  currentRank: RankInterface;
  previousRank: RankInterface;
  nextRank: RankInterface;
};
