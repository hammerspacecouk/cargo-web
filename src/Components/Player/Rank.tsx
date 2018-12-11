import * as React from "react";
import ProgressBar from "../Element/ProgressBar";
import RankStatusInterface from "../../interfaces/RankStatusInterface";
import {Loading} from "../Atoms/Loading/Loading";

export interface Props {
  rankStatus: RankStatusInterface;
}

export default ({ rankStatus }: Props) => {
  if (!rankStatus) {
    return <Loading />;
  }

  return (
    <div className="panel">
      <h2>{rankStatus.currentRank.title}</h2>
      <div>
        <ProgressBar percent={rankStatus.levelProgress} />
        <p className="f">{rankStatus.nextRank.title}</p>
      </div>
    </div>
  );
};
