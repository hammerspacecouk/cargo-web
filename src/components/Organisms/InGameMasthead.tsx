import * as React from "react";
import styled from "styled-components";
import {COLOURS, hexToRGBa} from "../../styles/colours";
import {GRID, MASTHEAD_HEIGHT, Z_INDEX} from "../../styles/variables";
import {Score} from "./Score";
import {useGameSessionContext} from "../../contexts/GameSessionContext/GameSessionContext";
import {routes} from "../../routes";
import {ChevronLeftIcon} from "../Icons/ChevronLeftIcon";
import {Icon} from "../Atoms/Icon";
import {BREAKPOINTS} from "../../styles/media";
import {SiteLogo} from "../Atoms/Logos";

export const InGameMasthead = () => {
    const {score, refreshSession, isAtHome} = useGameSessionContext();

    return (
        <MastheadPosition>
            <StyledMasthead>
                {!isAtHome && <BackButton/>}
                <MastHeadScore onClick={refreshSession}>
                    <Score score={score}/>
                </MastHeadScore>
                <LogoArea href="/"><SiteLogo/></LogoArea>
            </StyledMasthead>
        </MastheadPosition>
    );
};

const BackButton = () => (
    <Back href={routes.getPlay()}>
        <BackIcon>
            <ChevronLeftIcon/>
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

const Back = styled.a`
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
