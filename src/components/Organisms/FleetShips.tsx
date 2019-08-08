import * as React from "react";
import { IChannel, IFleetShip, IPort } from "../../interfaces";
import { NavigationItem } from "../Molecules/NavigationItem";
import { routes } from "../../routes";
import { NavigationList } from "./Navigation";
import styled from "styled-components";
import { GRID, NAV_ITEM_HEIGHT } from "../../styles/variables";
import { ELEMENTS } from "../../styles/typography";
import { ShieldStrength } from "../Molecules/ShieldStrength";
import { useGameSessionContext } from "../../contexts/GameSessionContext/GameSessionContext";
import { TravelCountdown } from "../Atoms/TravelCountdown";
import { useTravellingCountdown } from "../../hooks/useTravellingCountdown";
import { TextDanger, TextOk, TextWarning } from "../Atoms/Text";
import { PortName } from "../Molecules/PortName";

export const FleetShips = ({ fleetShips }: IProps) => {
  const { activeShip } = useGameSessionContext();

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
      <DestroyedLocation>Destroyed at {(fleetShip.ship.location as IPort).name}</DestroyedLocation>
    </div>
  </StyledDestroyedShip>
);

const ActiveShip = ({ fleetShip, isCurrent }: IItemProps) => {
  let subtext;
  if ((fleetShip.ship.location as IPort).name) {
    if ((fleetShip.ship.location as IPort).safeHaven) {
      subtext = (
        <TextWarning>
          <PortName port={fleetShip.ship.location as IPort} />
        </TextWarning>
      );
    } else {
      subtext = <TextDanger>{(fleetShip.ship.location as IPort).name}</TextDanger>;
    }
  } else if ((fleetShip.ship.location as IChannel).arrival) {
    subtext = (
      <TextOk>
        <Travelling channel={fleetShip.ship.location as IChannel} />
      </TextOk>
    );
  }

  return (
    <NavigationItem
      icon={<ShieldStrength percent={fleetShip.ship.strengthPercent} />}
      path={routes.getPlayShip(fleetShip.ship.id)}
      text={fleetShip.ship.name}
      subtext={subtext}
      isCurrent={isCurrent}
    />
  );
};

const Travelling = ({ channel }: { channel: IChannel }) => {
  const { secondsRemaining } = useTravellingCountdown(channel);
  return <TravelCountdown seconds={secondsRemaining} />;
};
