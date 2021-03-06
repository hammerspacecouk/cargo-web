import * as React from "react";
import { IChannel, IFleetShip, IPort, IShip } from "@src/interfaces";
import { NavigationItem } from "@src/components/Molecules/NavigationItem";
import { routes } from "@src/routes";
import { NavigationList } from "./Navigation";
import styled from "styled-components";
import { GRID, NAV_ITEM_HEIGHT } from "@src/styles/variables";
import { ELEMENTS } from "@src/styles/typography";
import { ShieldStrength } from "@src/components/Molecules/ShieldStrength";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import { TravelCountdown } from "@src/components/Atoms/TravelCountdown";
import { useTravellingCountdown } from "@src/hooks/useTravellingCountdown";
import { TextDanger, TextOk, TextWarning } from "@src/components/Atoms/Text";
import { PortName } from "@src/components/Molecules/PortName";
import { COLOURS, hexToRGBa } from "@src/styles/colours";
import { Icon, TEXT_ICON } from "@src/components/Atoms/Icon";
import { PlagueIcon } from "@src/components/Icons/PlagueIcon";

interface IConvoy {
  [key: string]: IFleetShip[];
}

export const FleetShips = ({ fleetShips }: IProps) => {
  const { activeShip } = useGameSessionContext();

  const convoys: IConvoy = {};
  const orphans: IFleetShip[] = [];

  fleetShips.forEach((fleetShip) => {
    if (!fleetShip.ship.isDestroyed && fleetShip.ship.convoyId) {
      if (!convoys[fleetShip.ship.convoyId]) {
        convoys[fleetShip.ship.convoyId] = [];
      }
      convoys[fleetShip.ship.convoyId].push(fleetShip);
      return;
    }
    orphans.push(fleetShip);
  });

  return (
    <NavigationList>
      {Object.values(convoys).map((convoy: IFleetShip[]) => (
        <Convoy key={convoy[0].ship.convoyId}>
          <ul>
            {convoy.map((fleetShip: IFleetShip) => (
              <li key={fleetShip.ship.name}>
                <ActiveShip
                  fleetShip={fleetShip}
                  isCurrent={!!(activeShip && activeShip.ship.id === fleetShip.ship.id)}
                />
              </li>
            ))}
          </ul>
        </Convoy>
      ))}
      {orphans.map((fleetShip: IFleetShip) => (
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

const Convoy = styled.li`
  background: ${hexToRGBa(COLOURS.WHITE.STANDARD, 0.1)};
  &:not(:last-child) {
    border-bottom: solid 4px ${hexToRGBa(COLOURS.WHITE.STANDARD, 0.7)};
  }
`;

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
    if ((fleetShip.ship.location as IPort).isSafe) {
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

  const name = (
    <>
      {fleetShip.ship.name}
      {fleetShip.ship.hasPlague && (
        <Plague title="Infected">
          <Icon size={TEXT_ICON}>
            <PlagueIcon />
          </Icon>
        </Plague>
      )}
    </>
  );

  return (
    <NavigationItem
      icon={<ShipIcon ship={fleetShip.ship} />}
      path={routes.getPlayShip(fleetShip.ship.id)}
      text={name}
      subtext={subtext}
      isCurrent={isCurrent}
    />
  );
};

const ShipIcon = ({ ship }: { ship: IShip }) => <ShieldStrength percent={ship.strengthPercent} ship={ship} />;

const Plague = styled.span`
  margin-left: ${GRID.HALF};
`;

const Travelling = ({ channel }: { channel: IChannel }) => {
  const { secondsRemaining } = useTravellingCountdown(channel);
  return <TravelCountdown seconds={secondsRemaining} />;
};
