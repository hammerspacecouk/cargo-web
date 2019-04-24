import * as React from "react";
import { Link } from "react-router-dom";
import { useActiveShipContext } from "../ActiveShipContext";
import { routes } from "../../../../routes";
import styled, { css } from "styled-components";
import { COLOURS } from "../../../../styles/colours";
import { GRID } from "../../../../styles/variables";
import { View } from "../../../../hooks/useActiveShip";

const StyledList = styled.ul`
    display: flex;
    background: ${COLOURS.BLACK.STANDARD};
    border-radius: 100vh;
    overflow: hidden;
    margin: ${GRID.UNIT};
`;

const StyledItem = styled.li`
    flex-grow: 1;
    flex-basis: 0;
    text-align: center;
`;

const StyledLink = styled(Link)<{active?: boolean}>`
    display: block;
    padding: ${GRID.UNIT} ${GRID.UNIT} calc(${GRID.UNIT} - 4px);
    color: ${COLOURS.WHITE.STANDARD};
    border-bottom: solid 4px transparent;
    ${({active}) => active ? `border-bottom-color: ${COLOURS.ACTIVE_HIGHLIGHT}` : css`
    &:hover,
    &:active,
    &:focus {
        color: ${COLOURS.BLACK.FULL};
        background: ${COLOURS.GREY.MID};
        text-decoration: none;
    }
`}
`;

export const ShipNavigation = () => {
  const {ship, currentView} = useActiveShipContext();

  return (
    <nav>
      <StyledList>
        <StyledItem>
          <StyledLink active={currentView === View.DETAIL ? 1 : 0} to={routes.getPlayShip(ship.id)}>Status</StyledLink>
        </StyledItem>
        <StyledItem>
          <StyledLink to={routes.getPlayShipDirections(ship.id)}>Crates</StyledLink>
        </StyledItem>
        <StyledItem>
          <StyledLink active={currentView === View.DIRECTIONS ? 1 : 0 } to={routes.getPlayShipDirections(ship.id)}>Directions</StyledLink>
        </StyledItem>
        <StyledItem>
          <StyledLink to={routes.getPlayShipDirections(ship.id)}>Ships</StyledLink>
        </StyledItem>
        <StyledItem>
          <StyledLink to={routes.getPlayShipDirections(ship.id)}>Shop</StyledLink>
        </StyledItem>
      </StyledList>
    </nav>
  );
};
