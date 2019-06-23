import * as React from "react";
import styled from "styled-components";
import { GRID, NAV_ITEM_HEIGHT } from "../../styles/variables";
import { useGameSessionContext } from "../../contexts/GameSessionContext/GameSessionContext";
import { Icon } from "../Atoms/Icon";
import { PlayerFlag } from "../Molecules/PlayerFlag";
import { ProgressBar } from "../Atoms/ProgressBar";
import { ELEMENTS } from "../../styles/typography";

const StyledSummary = styled.div`
  display: flex;
  align-items: center;
  padding: 0 ${GRID.UNIT};
  height: ${NAV_ITEM_HEIGHT};
`;

const Rank = styled.div`
  flex: 1;
  margin-left: ${GRID.UNIT};
`;

const RankTitle = styled.div`
  ${ELEMENTS.H5};
  margin-bottom: ${GRID.QUARTER};
`;

export const PlayerSummary = () => {
  const { player, rankStatus } = useGameSessionContext();

  return (
    <StyledSummary>
      <Icon>
        <PlayerFlag player={player} />
      </Icon>
      <Rank>
        <RankTitle>{rankStatus.currentRank.title}</RankTitle>
        <ProgressBar small percent={rankStatus.levelProgress} />
      </Rank>
    </StyledSummary>
  );
};
