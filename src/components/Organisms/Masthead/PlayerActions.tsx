import * as React from "react";
import styled from "styled-components";
import { Score } from "../../../containers/Player/Score";
import { useSessionContext } from "../../../context/SessionContext";
import { COLOURS, hexToRGBa } from "../../../styles/colours";
import { GRID, MASTHEAD_HEIGHT } from "../../../styles/variables";
import { HaloLink } from "../../Atoms/HaloLink/HaloLink";
import { Hidden } from "../../Atoms/Hidden/Hidden";
import { Icon, SMALL_ICON } from "../../Atoms/Icon/Icon";
import { Notification } from "../../Atoms/Notification/Notification";
import { FlexStretch } from "../../Atoms/Flex/Flex";
import { MenuIcon } from "../../Icons/MenuIcon/MenuIcon";
import { CloseIcon } from "../../Icons/CloseIcon/CloseIcon";

const MastHeadScore = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  padding: 0 ${GRID.HALF};
  max-width: calc(100vw - ${MASTHEAD_HEIGHT + 1}px);
`;

const MenuSurround = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  border-left: solid 1px ${hexToRGBa(COLOURS.BODY.TEXT, 0.6)};
`;

const MenuButton = styled(HaloLink)`
  padding: calc((${MASTHEAD_HEIGHT}px - ${SMALL_ICON}) / 2);
  display: flex;
  align-items: center;
`;

export const PlayerActions = () => {
  const { score, hasProfileNotification, toggleMenu, menuOpen } = useSessionContext();

  return (
    <>

      <FlexStretch>
        <MastHeadScore>
          <Score score={score}/>
        </MastHeadScore>
      </FlexStretch>
      <MenuSurround>
        <MenuButton as="button" onClick={toggleMenu}>
          <Hidden>Menu</Hidden>
          <Icon size={SMALL_ICON}>
            {menuOpen ? <CloseIcon /> : <MenuIcon/>}
          </Icon>
          {hasProfileNotification && !menuOpen && (
            <Notification title="Notification to view"/>
          )}
        </MenuButton>
      </MenuSurround>
    </>
  );
};
