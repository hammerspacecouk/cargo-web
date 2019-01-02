import * as React from "react";
import { IRankStatus } from "../../../Interfaces";
import { H2 } from "../../Atoms/Heading/Heading";
import { Loading } from "../../Atoms/Loading/Loading";
import { ProgressBar } from "../../Atoms/ProgressBar/ProgressBar";
import { TextF } from "../../Atoms/Text/Text";
import { Panel } from "../../Molecules/Panel/Panel";

interface IProps {
  rankStatus: IRankStatus;
}

export const PlayerRank = ({ rankStatus }: IProps) => {
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
