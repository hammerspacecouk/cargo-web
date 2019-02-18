import * as React from "react";
import styled from "styled-components";
import { Score } from "../../../containers/Player/Score";
import { useSessionContext } from "../../../context/SessionContext";
import { routes } from "../../../routes";
import { COLOURS, hexToRGBa } from "../../../styles/colours";
import { GRID } from "../../../styles/variables";
import { HaloLink } from "../../Atoms/HaloLink/HaloLink";
import { Hidden } from "../../Atoms/Hidden/Hidden";
import { Icon } from "../../Atoms/Icon/Icon";
import { Notification } from "../../Atoms/Notification/Notification";
import { ProfileIcon } from "../../Icons/ProfileIcon/ProfileIcon";
import { BREAKPOINTS } from "../../../styles/media";

const MastHeadScore = styled.div`
  display: flex;
  border-left: solid 1px ${hexToRGBa(COLOURS.BODY.TEXT, 0.6)};
  > a {
    display: flex;
    padding: 0 ${GRID.UNIT};
  }
`;

const Profile = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  border-left: solid 1px ${hexToRGBa(COLOURS.BODY.TEXT, 0.6)};
  ${BREAKPOINTS.MAX`
    border-right: solid 1px ${hexToRGBa(COLOURS.BODY.TEXT, 0.6)};
  `}
`;

const ProfileLink = styled(HaloLink)`
  padding: ${GRID.HALF} ${GRID.UNIT};
  display: flex;
  align-items: center;
`;

export const PlayerActions = () => {
  const { score, hasProfileNotification } = useSessionContext();

  return (
    <>
      <MastHeadScore>
        <HaloLink href={routes.getPlay()} rel="nofollow">
          <Score score={score} />
        </HaloLink>
      </MastHeadScore>
      <Profile>
        <ProfileLink href="/profile" rel="nofollow" title="Profile">
          <Hidden>Profile</Hidden>

          <Icon>
            <ProfileIcon />
          </Icon>
          {hasProfileNotification && (
            <Notification title="Notification to view" />
          )}
        </ProfileLink>
      </Profile>
    </>
  );
};
