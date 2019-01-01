import * as React from "react";
import { ProgressBar } from "../../Atoms/ProgressBar/ProgressBar";
import { RankStatusInterface } from "../../../Interfaces";
import { Loading } from "../../Atoms/Loading/Loading";
import { Panel } from "../../Molecules/Panel/Panel";
import { H2 } from "../../Atoms/Heading/Heading";
import { TextF } from "../../Atoms/Text/Text";

interface Props {
  rankStatus: RankStatusInterface;
}

export const PlayerRank = ({ rankStatus }: Props) => {
  if (!rankStatus) {
    return <Loading />;
  }

  return (
    <Panel>
      <H2>{rankStatus.currentRank.title}</H2>
      <div>
        <ProgressBar percent={rankStatus.levelProgress} />
        <TextF as="p">{rankStatus.nextRank.title}</TextF>
      </div>
    </Panel>
  );
};
