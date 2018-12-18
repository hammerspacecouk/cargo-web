import * as React from "react";
import { Link } from "react-router-dom";
import { useCurrentShipContext } from "../../context/CurrentShipContext";
import styled from "styled-components";
import { COLOURS } from "../../styles/colours";
import { ListInline } from "../Atoms/Lists/ListInline/ListInline";
import { GRID } from "../../styles/variables";
import Icon from "../Atoms/Icon/Icon";

export const playBarHeight = 80;

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

const iconMoney = (
  <svg className="play-bar__icon" viewBox="0 0 24 24">
    <path d="M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9M1,10H3V20H19V22H1V10Z" />
  </svg>
);

const PlayBarItem = styled.li`
  text-transform: uppercase;
`;

const PlayBarIcon = styled(Icon)`
  display: block;
  margin: 0 auto ${GRID.QUARTER};
`;

const getShipLink = () => {
  const { ship } = useCurrentShipContext();
  if (ship) {
    return (
      <PlayBarItem>
        <PlayBarLink to={`/play/${ship.id}`} className="play-bar__link">
          <PlayBarIcon>{iconLocation}</PlayBarIcon>
          {ship.name}
        </PlayBarLink>
      </PlayBarItem>
    );
  }

  return (
    <PlayBarItem>
      <span className="play-bar__link play-bar__link--disabled">
        <PlayBarIcon>{iconLocation}</PlayBarIcon>
        Location
      </span>
    </PlayBarItem>
  );
};

const StyledPlayBar = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: ${playBarHeight}px;
  overflow: hidden;
  background: ${COLOURS.BLACK.STANDARD};
  color: ${COLOURS.BODY.TEXT};
`;

const PlayBarLink = styled(Link)`
  color: inherit;
  display: inline-block;
`;

const List = styled(ListInline)`
  display: flex;
  padding: ${GRID.UNIT} 0;
  text-align: center;
  justify-content: space-evenly;
`;

export const PlayBar = () => {
  return (
    <StyledPlayBar>
      <List>
        {getShipLink()}
        <PlayBarItem>
          <PlayBarLink to="/play" className="play-bar__link">
            <PlayBarIcon>{iconStuff}</PlayBarIcon>
            Fleet{" "}
            {/* todo - add a notification icon if any ships are in port */}
          </PlayBarLink>
        </PlayBarItem>
        <PlayBarItem>
          <PlayBarLink to={`/play/upgrades`} className="play-bar__link">
            <PlayBarIcon>{iconMoney}</PlayBarIcon>
            Upgrades
          </PlayBarLink>
        </PlayBarItem>
      </List>
    </StyledPlayBar>
  );
};
