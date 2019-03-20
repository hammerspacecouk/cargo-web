import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GRID } from "../../../styles/variables";
import { routes } from "../../../routes";
import { ProfileIcon } from "../../Icons/ProfileIcon/ProfileIcon";
import { Icon } from "../../Atoms/Icon/Icon";
import { COLOURS } from "../../../styles/colours";
import { Notification } from "../../Atoms/Notification/Notification";
import { useSessionContext } from "../../../context/SessionContext";
import { IChildrenProps } from "../../../Interfaces";

// todo - move icons
const iconLocation = (
  <svg className="play-bar__icon" viewBox="0 0 24 24">
    <path d="M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2M12,4A5,5 0 0,0 7,9C7,10 7,12 12,18.71C17,12 17,10 17,9A5,5 0 0,0 12,4Z" />
  </svg>
);

const iconStuff = (
  <svg className="play-bar__icon" viewBox="0 0 24 24">
    <path d="M20,6C20.58,6 21.05,6.2 21.42,6.59C21.8,7 22,7.45 22,8V19C22,19.55 21.8,20 21.42,20.41C21.05,20.8 20.58,21 20,21H4C3.42,21 2.95,20.8 2.58,20.41C2.2,20 2,19.55 2,19V8C2,7.45 2.2,7 2.58,6.59C2.95,6.2 3.42,6 4,6H8V4C8,3.42 8.2,2.95 8.58,2.58C8.95,2.2 9.42,2 10,2H14C14.58,2 15.05,2.2 15.42,2.58C15.8,2.95 16,3.42 16,4V6H20M4,8V19H20V8H4M14,6V4H10V6H14Z" />
  </svg>
);

const iconGarage = (
  <svg className="play-bar__icon" viewBox="0 0 24 24">
    <path d="M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z" />
  </svg>
);

const ListItem = styled.li`
    display: block;
    border-bottom: solid 1px ${COLOURS.GREY.MID};
`;

const StyledMenuLink = styled(Link)`
    display: flex;
    padding: ${GRID.UNIT};
    justify-content: flex-start;
    align-items: center;
    color: ${COLOURS.WHITE.STANDARD};
    position: relative;
    &:hover,
    &:active,
    &:focus {
        background: ${COLOURS.GREY.MID};
    }
`;

const IconArea = styled.span`
    display: flex;
    position: relative;
    margin-right: ${GRID.UNIT};
`;

interface IMenuLinkProps extends IChildrenProps{
  to: string;
}

export const MainMenuList = () => {

  const { toggleMenu, hasProfileNotification } = useSessionContext();

  const MenuLink = ({to, children}: IMenuLinkProps) => {
    return (
      <StyledMenuLink to={to} onClick={toggleMenu}>
        {children}
      </StyledMenuLink>
    );
  };


  /*
   const { ship } = useCurrentShipContext();
  if (ship) {
    return (
      <PlayBarItem isActive={false}>
        <PlayBarLink to={`/play/${ship.id}`}>
          <PlayBarIcon>{iconLocation}</PlayBarIcon>
          <PlayBarItemText>{ship.name}</PlayBarItemText>
        </PlayBarLink>
      </PlayBarItem>
    );
  }

  return (
    <InactivePlayBarItem>
      <PlayBarInactiveLink>
        <PlayBarIcon>{iconLocation}</PlayBarIcon>
        <PlayBarItemText>Location</PlayBarItemText>
      </PlayBarInactiveLink>
    </InactivePlayBarItem>
  );
};
   */

  return (
    <ul>
      <ListItem>
        <MenuLink to="/play">
          <IconArea>
            <Icon>{iconGarage}</Icon>
          </IconArea>
          Fleet
        </MenuLink>
      </ListItem>
      <ListItem>
        <MenuLink to="/play/inventory">
          <IconArea>
            <Icon>{iconStuff}</Icon>
          </IconArea>
          Inventory
        </MenuLink>
      </ListItem>
      <ListItem>
        <MenuLink to={routes.getProfile()}>
          <IconArea>
            <Icon><ProfileIcon/></Icon>
          </IconArea>
          Profile
          {hasProfileNotification && (
            <Notification title="Notification to view"/>
          )}
        </MenuLink>
      </ListItem>
    </ul>
  );
};
