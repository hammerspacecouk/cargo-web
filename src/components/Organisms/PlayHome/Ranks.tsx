import * as React from "react";
import { useGameSessionContext } from "../../../contexts/GameSessionContext/GameSessionContext";
import styled, { css } from "styled-components";
import { COLOURS } from "../../../styles/colours";
import { GRID } from "../../../styles/variables";
import { SIZES } from "../../../styles/typography";
import { SMALL_ICON, TINY_ICON } from "../../Atoms/Icon";

export const Ranks = () => {
  const { rankStatus } = useGameSessionContext();
  let ranks = [
    rankStatus.nextRank,
    rankStatus.currentRank,
    rankStatus.previousRank,
    ...rankStatus.olderRanks
  ].filter(x => x);

  // pad the unknowns
  ranks = [...Array(25 - ranks.length).fill(null), ...ranks];

  let hasPassed = false;
  return (
    <StyledList>{ranks.map((rank, i) => {
      let isCurrent = false;
      if (rank && rank.id === rankStatus.currentRank.id) {
        hasPassed = true;
        isCurrent = true;
      }
      return <StyledRankItem
        key={rank ? rank.id : i}
        isActive={hasPassed}
        isCurrent={isCurrent}
      >{rank ? rank.title : '-'}</StyledRankItem>
    })}</StyledList>
  );
};

const StyledList = styled.ol`
    margin-top: ${GRID.HALF};
`;

const StyledRankItem = styled.li<{isCurrent: boolean, isActive: boolean}>`
    position: relative;
    padding: ${GRID.QUARTER} 0 ${GRID.QUARTER} calc(${SMALL_ICON} + ${GRID.HALF});
    ${SIZES.D};
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: ${TINY_ICON};
        margin-left: ${GRID.QUARTER};
        background: ${({isActive}) => isActive ? COLOURS.ACTIVE_HIGHLIGHT : COLOURS.BLACK.STANDARD};
    }
    &:first-child {
        padding-top: 0;
        &:before {
            border-top-left-radius: ${GRID.DOUBLE};
            border-top-right-radius: ${GRID.DOUBLE};
        }
    }
    &:last-child {
        padding-bottom: 0;
        &:before {
            border-bottom-left-radius: ${GRID.DOUBLE};
            border-bottom-right-radius: ${GRID.DOUBLE};
        }
    }
    ${({isCurrent}) => isCurrent && css`
        ${SIZES.C};
        color: ${COLOURS.ACTIVE_HIGHLIGHT}
    `};
`;
