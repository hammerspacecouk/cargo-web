interface RankInterface {
  title: string;
}

export default interface RankStatusInterface {
  portsVisited: number;
  isRecentPromotion: boolean;
  levelProgress: number;
  currentRank: RankInterface;
  previousRank: RankInterface;
  nextRank: RankInterface;
};
