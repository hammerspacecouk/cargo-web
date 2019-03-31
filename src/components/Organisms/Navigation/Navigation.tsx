import * as React from "react";
import styled, { css } from "styled-components";
import { COLOURS, hexToRGBa, scrollbars } from "../../../styles/colours";
import { Hidden } from "../../Atoms/Hidden/Hidden";
import { PlayerSummary } from "../PlayerSummary/PlayerSummary";
import { ListUnstyled } from "../../Atoms/Lists/ListUnstyled/ListUnstyled";
import { BREAKPOINTS } from "../../../styles/media";
import { NavigationItem } from "../../Molecules/NavigationItem/NavigationItem";
import { InventoryIcon } from "../../Icons/InventoryIcon/InventoryIcon";
import { ProfileIcon } from "../../Icons/ProfileIcon/ProfileIcon";
import { useGameContext } from "../../../context/GameContext";
import { FleetShips } from "../FleetShips/FleetShips";

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
    ${scrollbars};
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
  const { ships } = useGameContext();

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
              path="/play/inventory"
              text="Inventory"
            />
          </li>
          <li>
            <NavigationItem
              icon={<ProfileIcon />}
              path="/profile"
              text="Profile"
            />
          </li>
        </NavigationList>
      </PlayerOptions>
    </StyledNavigation>
  );
};
