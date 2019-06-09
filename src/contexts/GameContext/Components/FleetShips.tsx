import * as React from "react";
import { IFleetShip } from "../../../Interfaces";
import { NavigationItem } from "../../../components/Molecules/NavigationItem/NavigationItem";
import { routes } from "../../../routes";
import { NavigationList } from "./Navigation";
import styled from "styled-components";
import { GRID, NAV_ITEM_HEIGHT } from "../../../styles/variables";
import { ELEMENTS } from "../../../styles/typography";
import { ShieldStrength } from "../../../components/Molecules/ShieldStrength/ShieldStrength";
import { useGameContext } from "../GameContext";

interface IProps {
  fleetShips: IFleetShip[];
}

interface IItemProps {
  fleetShip: IFleetShip;
  isCurrent?: boolean;
}

const StyledDestroyedShip = styled.div`
  height: ${NAV_ITEM_HEIGHT};
  display: flex;
  opacity: 0.3;
  font-style: italic;
  align-items: center;
  padding: 0 ${GRID.UNIT};
`;

const DestroyedLocation = styled.span`
  ${ELEMENTS.H6};
  display: block;
  margin-top: ${GRID.QUARTER};
`;

const DestroyedShip = ({ fleetShip }: IItemProps) => (
  <StyledDestroyedShip>
    <div>
      {fleetShip.ship.name}
      <DestroyedLocation>Destroyed at {fleetShip.ship.location.name}</DestroyedLocation>
    </div>
  </StyledDestroyedShip>
);

const ActiveShip = ({ fleetShip, isCurrent }: IItemProps) => (
  <NavigationItem
    icon={<ShieldStrength percent={fleetShip.ship.strengthPercent} />}
    path={routes.getPlayShip(fleetShip.ship.id)}
    text={fleetShip.ship.name}
    isCurrent={isCurrent}
  />
);

export const FleetShips = ({ fleetShips }: IProps) => {
  const { activeShip } = useGameContext();

  return (
    <NavigationList>
      {/* todo - destroyed ships & attention */}
      {fleetShips.map((fleetShip: IFleetShip) => (
        <li key={fleetShip.ship.name}>
          {fleetShip.ship.isDestroyed ? (
            <DestroyedShip fleetShip={fleetShip} />
          ) : (
            <ActiveShip fleetShip={fleetShip} isCurrent={!!(activeShip && activeShip.ship.id === fleetShip.ship.id)} />
          )}
        </li>
      ))}
    </NavigationList>
  );
};
