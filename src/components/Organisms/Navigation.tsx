import * as React from "react";
import styled from "styled-components";
import { COLOURS, hexToRGBa, scrollbarStyles } from "../../styles/colours";
import { Hidden } from "../Atoms/Hidden";
import { PlayerSummary } from "./PlayerSummary";
import { ListUnstyled } from "../Atoms/List/ListUnstyled";
import { BREAKPOINTS } from "../../styles/media";
import { NavigationItem } from "../Molecules/NavigationItem";
import { InventoryIcon } from "../Icons/InventoryIcon";
import { ProfileIcon } from "../Icons/ProfileIcon";
import { useGameSessionContext } from "../../contexts/GameSessionContext/GameSessionContext";
import { FleetShips } from "./FleetShips";

interface IProps {
  className?: string;
}

const StyledNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  background: ${COLOURS.BLACK.FADED};
`;

const Ships = styled.div`
  background: ${COLOURS.BLACK.STANDARD};
  flex: 1;
  ${BREAKPOINTS.XL`
    overflow-y: auto;
    ${scrollbarStyles.toString()};
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
              icon={<InventoryIcon />}
              isCurrent={false}
              path={{ href: "/play/inventory" }}
              text="Launch ships"
            />
          </li>
          <li>
            <NavigationItem icon={<ProfileIcon />} isCurrent={false} path={{ href: "/play/profile" }} text="Profile" />
          </li>
        </NavigationList>
      </PlayerOptions>
    </StyledNavigation>
  );
};
