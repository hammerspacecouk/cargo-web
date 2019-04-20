import * as React from "react";
import styled from "styled-components";
import { GRID, NAV_ITEM_HEIGHT } from "../../../styles/variables";
import { useGameContext } from "../GameContext";
import { Icon } from "../../../components/Atoms/Icon/Icon";
import { PlayerFlag } from "../../../components/Molecules/PlayerFlag/PlayerFlag";
import { H5 } from "../../../components/Atoms/Heading/Heading";
import { ProgressBar } from "../../../components/Atoms/ProgressBar/ProgressBar";
import { TextF } from "../../../components/Atoms/Text/Text";
import { ELEMENTS, SIZES } from "../../../styles/typography";

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
    ${ELEMENTS.H6};
    margin-bottom: ${GRID.QUARTER};
`;

export const PlayerSummary = () => {
  const {player, rankStatus} = useGameContext();

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
