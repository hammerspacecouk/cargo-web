import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import { GRID, NAV_ITEM_HEIGHT } from "@src/styles/variables";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import { Icon, TINY_ICON } from "@src/components/Atoms/Icon";
import { PlayerFlag } from "@src/components/Molecules/PlayerFlag";
import { ProgressBar } from "@src/components/Atoms/ProgressBar";
import { ELEMENTS } from "@src/styles/typography";
import { COLOURS, hexToRGBa } from "@src/styles/colours";
import { routes } from "@src/routes";
import { ChevronRightIcon } from "@src/components/Icons/ChevronRightIcon";
import { ArrowIcon } from "@src/components/Molecules/NavigationItem";

const StyledSummary = styled.a`
  display: flex;
  align-items: center;
  padding: ${GRID.UNIT};
  min-height: ${NAV_ITEM_HEIGHT};
  color: ${COLOURS.WHITE.STANDARD};
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
    <Link href={routes.getPlayProfile()} prefetch={false}>
      <StyledSummary href={routes.getPlayProfile()}>
        <Icon>
          <PlayerFlag player={player} />
        </Icon>
        <Rank>
          <RankTitle>
            {rankStatus.currentRank.title} {player.displayName}
          </RankTitle>
          <ProgressBar small percent={rankStatus.levelProgress} />
        </Rank>
        <ArrowIcon size={TINY_ICON}>
          <ChevronRightIcon />
        </ArrowIcon>
      </StyledSummary>
    </Link>
  );
};
