import * as React from "react";
import { IPlayer, IRankStatus } from "../../../Interfaces";
import { H1, H2 } from "../../Atoms/Heading/Heading";
import { Loading } from "../../Atoms/Loading/Loading";
import { ProgressBar } from "../../Atoms/ProgressBar/ProgressBar";
import { TextF } from "../../Atoms/Text/Text";
import { Panel } from "../../Molecules/Panel/Panel";
import { Square } from "../../Atoms/Ratio/Ratio";
import { PlayerFlag } from "../../Molecules/PlayerFlag/PlayerFlag";
import styled from "styled-components";

interface IProps {
  rankStatus: IRankStatus;
  player: IPlayer;
}

const FlagArea = styled.div`
  display: block;
  width: 128px;
`;

export const PlayerRank = ({ player, rankStatus }: IProps) => {
  if (!rankStatus) {
    return <Loading />;
  }

  return (
    <Panel>
      <FlagArea>
        <Square>
          <PlayerFlag player={player} />
        </Square>
      </FlagArea>
      <H2>{rankStatus.currentRank.title}</H2>
      <div>
        <ProgressBar percent={rankStatus.levelProgress} />
        <TextF as="p">{rankStatus.nextRank.title}</TextF>
      </div>
    </Panel>
  );
};
