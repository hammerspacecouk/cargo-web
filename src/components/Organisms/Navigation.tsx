import * as React from "react";
import styled from "styled-components";
import { COLOURS, hexToRGBa } from "../../styles/colours";
import { Hidden } from "../Atoms/Hidden";
import { PlayerSummary } from "./PlayerSummary";
import { ListUnstyled } from "../Atoms/List/ListUnstyled";
import { BREAKPOINTS } from "../../styles/media";
import { NavigationItem } from "../Molecules/NavigationItem";
import { LaunchIcon } from "../Icons/LaunchIcon";
import { useGameSessionContext } from "../../contexts/GameSessionContext/GameSessionContext";
import { FleetShips } from "./FleetShips";
import { routes } from "../../routes";
import { Z_INDEX } from "../../styles/variables";
import { MapIcon } from "../Icons/MapIcon";
import { JumpLink } from "../Atoms/JumpLink";

interface IProps {
  className?: string;
}

const StyledNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  background: ${COLOURS.BLACK.FADED};
  z-index: ${Z_INDEX.MENU};
  padding-bottom: env(safe-area-inset-bottom);
`;

const Ships = styled.div`
  background: ${COLOURS.BLACK.STANDARD};
  flex: 1;
  ${BREAKPOINTS.XL`
    overflow-y: auto;
  `};
`;

const PlayerOptions = styled.div`
  justify-self: flex-end;
`;

export const NavigationList = styled(ListUnstyled)`
  > li {
    border-bottom: solid 1px ${hexToRGBa(COLOURS.WHITE.STANDARD, 0.2)};
    &:last-child {
      border-bottom: none;
    }
  }
`;

export const Navigation = ({ className }: IProps) => {
  const { ships } = useGameSessionContext();

  return (
    <StyledNavigation className={className}>
      <JumpLink id="fleet" />
      <PlayerSummary />
      <Ships>
        <Hidden as="h2">Ships</Hidden>
        <FleetShips fleetShips={ships} />
      </Ships>
      <PlayerOptions>
        <Hidden as="h2">Player</Hidden>
        <NavigationList>
          <li>
            <NavigationItem
              icon={<MapIcon />}
              isCurrent={false}
              path={{ href: `${routes.getPlay()}#map` }}
              text="Status"
            />
          </li>
          <li>
            <NavigationItem
              icon={<LaunchIcon />}
              isCurrent={false}
              path={{ href: routes.getPlayLaunch() }}
              text="Launch Ships"
            />
          </li>
        </NavigationList>
      </PlayerOptions>
    </StyledNavigation>
  );
};
