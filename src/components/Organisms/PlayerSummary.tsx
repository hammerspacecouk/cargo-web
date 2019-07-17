import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import { GRID, NAV_ITEM_HEIGHT } from "../../styles/variables";
import { useGameSessionContext } from "../../contexts/GameSessionContext/GameSessionContext";
import { Icon } from "../Atoms/Icon";
import { PlayerFlag } from "../Molecules/PlayerFlag";
import { ProgressBar } from "../Atoms/ProgressBar";
import { ELEMENTS } from "../../styles/typography";
import { COLOURS, hexToRGBa } from "../../styles/colours";
import { routes } from "../../routes";

const StyledSummary = styled.a`
  display: flex;
  align-items: center;
  padding: 0 ${GRID.UNIT};
  height: ${NAV_ITEM_HEIGHT};
  &:hover,
  &:focus {
    background: ${hexToRGBa(COLOURS.WHITE.STANDARD, 0.1)};
    text-decoration: none;
  }
  &:active {
    text-decoration: none;
    background: ${hexToRGBa(COLOURS.WHITE.STANDARD, 0.05)};
  }
`;

const Rank = styled.div`
  flex: 1;
  margin-left: ${GRID.UNIT};
`;

const RankTitle = styled.div`
  ${ELEMENTS.H5};
  margin-bottom: ${GRID.QUARTER};
  color: ${COLOURS.BODY.TEXT};
`;

export const PlayerSummary = () => {
  const { player, rankStatus } = useGameSessionContext();

  return (
    <Link href={routes.getPlayHome()}>
      <StyledSummary href={routes.getPlayHome()}>
        <Icon>
          <PlayerFlag player={player} />
        </Icon>
        <Rank>
          <RankTitle>{rankStatus.currentRank.title}</RankTitle>
          <ProgressBar small percent={rankStatus.levelProgress} />
        </Rank>
      </StyledSummary>
    </Link>
  );
};
