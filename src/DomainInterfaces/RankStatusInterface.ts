import RankInterface from "./RankInterface";

export default interface RankStatusInterface {
  portsVisited: number;
  isRecentPromotion: boolean;
  levelProgress: number;
  currentRank: RankInterface;
  previousRank: RankInterface;
  nextRank: RankInterface;
};
