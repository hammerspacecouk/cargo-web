import * as React from "react";
import { IFleetShip } from "../../../Interfaces";
import { NavigationItem } from "../../Molecules/NavigationItem/NavigationItem";
import { InventoryIcon } from "../../Icons/InventoryIcon/InventoryIcon";
import { routes } from "../../../routes";
import { NavigationList } from "../Navigation/Navigation";
import styled from "styled-components";
import { GRID, NAV_ITEM_HEIGHT } from "../../../styles/variables";
import { ELEMENTS } from "../../../styles/typography";
import { ShieldStrength } from "../../Molecules/ShieldStrength/ShieldStrength";

interface IProps {
  fleetShips: IFleetShip[];
}

interface IItemProps {
  fleetShip: IFleetShip;
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
      <DestroyedLocation>
        Destroyed at {fleetShip.ship.location.name}
      </DestroyedLocation>
    </div>
  </StyledDestroyedShip>
);

const ActiveShip = ({ fleetShip }: IItemProps) => (
  <NavigationItem
    icon={<ShieldStrength percent={fleetShip.ship.strengthPercent} />}
    path={routes.getPlayShip(fleetShip.ship.id)}
    text={fleetShip.ship.name}
  />
);

export const FleetShips = ({ fleetShips }: IProps) => {
  return (
    <NavigationList>
      {/* todo - destroyed ships & attention */}
      {fleetShips.map((fleetShip: IFleetShip) => (
        <li key={fleetShip.ship.name}>
          {fleetShip.ship.isDestroyed ? (
            <DestroyedShip fleetShip={fleetShip} />
          ) : (
            <ActiveShip fleetShip={fleetShip} />
          )}
        </li>
      ))}
    </NavigationList>
  );
};
