import * as React from "react";
import styled from "styled-components";
import { COLOURS, hexToRGBa } from "../../styles/colours";
import { GRID, MASTHEAD_HEIGHT, Z_INDEX } from "../../styles/variables";
import { Score } from "./Score";
import { useGameSessionContext } from "../../contexts/GameSessionContext/GameSessionContext";
import { routes } from "../../routes";
import { Hidden } from "../Atoms/Hidden";
import { ChevronLeftIcon } from "../Icons/ChevronLeftIcon";
import { Icon } from "../Atoms/Icon";
import { BREAKPOINTS } from "../../styles/media";

const MastheadPosition = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background: ${COLOURS.BODY.BACKGROUND};
  z-index: ${Z_INDEX.OVERLAY_BOTTOM};
  height: ${MASTHEAD_HEIGHT};
  border-bottom: solid 1px ${COLOURS.GREY.MID};
`;

const StyledMasthead = styled.div`
  color: ${COLOURS.BODY.TEXT};
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  height: ${MASTHEAD_HEIGHT};
`;

const MastHeadScore = styled.div`
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding: 0 ${GRID.HALF};
`;

const Back = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${MASTHEAD_HEIGHT};
  width: ${MASTHEAD_HEIGHT};
  color: ${COLOURS.WHITE.STANDARD};
  &:hover,
  &:active,
  &:focus {
    background: ${hexToRGBa(COLOURS.WHITE.STANDARD, 0.2)};
  }
  ${BREAKPOINTS.XL`display: none;`}
`;

const BackButton = () => (
  <Back href={routes.getPlay()}>
    <Hidden>Back to fleet list</Hidden>
    <Icon>
      <ChevronLeftIcon />
    </Icon>
  </Back>
);

export const InGameMasthead = () => {
  const { score, refreshSession, isAtHome } = useGameSessionContext();

  return (
    <MastheadPosition>
      <StyledMasthead>
        {!isAtHome && <BackButton />}
        <MastHeadScore onClick={refreshSession}>
          <Score score={score} />
        </MastHeadScore>
      </StyledMasthead>
    </MastheadPosition>
  );
};
