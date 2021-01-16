import * as React from "react";
import styled, { css } from "styled-components";
import { COLOURS, hexToRGBa } from "@src/styles/colours";
import { GRID, MASTHEAD_HEIGHT, Z_INDEX } from "@src/styles/variables";
import { Score } from "./Score";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import { routes } from "@src/routes";
import { ChevronLeftIcon } from "@src/components/Icons/ChevronLeftIcon";
import { Icon } from "@src/components/Atoms/Icon";
import { BREAKPOINTS } from "@src/styles/media";
import { SiteLogo } from "@src/components/Atoms/Logos";
import { tutorialHighlightAnimation } from "@src/components/Organisms/ShipNavigation";
import { CurrentPage } from "@src/contexts/GameSessionContext/GameSessionContainer";

export const InGameMasthead = () => {
  const { score, refreshSession, currentPage, tutorialStep } = useGameSessionContext();

  return (
    <MastheadPosition>
      <StyledMasthead>
        {currentPage !== CurrentPage.home && (
          <BackButton highlight={tutorialStep === 4 && currentPage !== CurrentPage.launch} />
        )}
        <MastHeadScore onClick={refreshSession}>
          <Score score={score} />
        </MastHeadScore>
        <LogoArea href="/">
          <SiteLogo />
        </LogoArea>
      </StyledMasthead>
    </MastheadPosition>
  );
};

const BackButton = ({ highlight }: { highlight?: boolean }) => (
  <Back href={`${routes.getPlay()}#fleet`} $highlight={highlight}>
    <BackIcon>
      <ChevronLeftIcon />
    </BackIcon>
    <span>Fleet</span>
  </Back>
);

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
  position: relative;
  height: ${MASTHEAD_HEIGHT};
`;

const MastHeadScore = styled.div`
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  padding: 0 ${GRID.HALF};
  background: ${COLOURS.BODY.BACKGROUND};
  margin-bottom: 2px;
  flex: 1;
`;

const Back = styled.a<{ $highlight?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLOURS.WHITE.STANDARD};
  padding-right: ${GRID.HALF};
  &:hover,
  &:active,
  &:focus {
    background: ${hexToRGBa(COLOURS.WHITE.STANDARD, 0.2)};
  }
  ${BREAKPOINTS.XL`display: none;`}
  ${({ $highlight }) =>
    $highlight &&
    css`
      animation: ${tutorialHighlightAnimation} 2s ease-in-out infinite;
    `};
`;

const BackIcon = styled(Icon)`
  height: ${MASTHEAD_HEIGHT};
  width: ${MASTHEAD_HEIGHT};
`;

const LogoArea = styled.a`
  width: 42px;
  height: 28px;
  position: absolute;
  top: 7px;
  left: 50%;
  transform: translateX(-50%);
  color: inherit;
  &:hover {
    opacity: 0.7;
  }
`;
