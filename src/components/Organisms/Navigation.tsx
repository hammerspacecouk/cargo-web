import * as React from "react";
import styled from "styled-components";
import { COLOURS, hexToRGBa } from "@src/styles/colours";
import { Hidden } from "@src/components/Atoms/Hidden";
import { PlayerSummary } from "./PlayerSummary";
import { ListUnstyled } from "@src/components/Atoms/List/ListUnstyled";
import { BREAKPOINTS } from "@src/styles/media";
import { NavigationItem } from "@src/components/Molecules/NavigationItem";
import { LaunchIcon } from "@src/components/Icons/LaunchIcon";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import { FleetShips } from "./FleetShips";
import { routes } from "@src/routes";
import { GRID, NAV_ITEM_HEIGHT, Z_INDEX } from "@src/styles/variables";
import { MapIcon } from "@src/components/Icons/MapIcon";
import { JumpLink } from "@src/components/Atoms/JumpLink";
import { IPort } from "@src/interfaces";

interface IProps {
  className?: string;
}

const StyledNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  background: ${COLOURS.BLACK.FADED};
  z-index: ${Z_INDEX.MENU};
  padding-bottom: 50px;
  padding-bottom: calc(50px + env(safe-area-inset-bottom));
  ${BREAKPOINTS.L`
    padding-bottom: 64px;
    padding-bottom: calc(64px + env(safe-area-inset-bottom));
  `};
  ${BREAKPOINTS.XL`
    padding-bottom: 0;
    padding-bottom: env(safe-area-inset-bottom);
  `};
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
  li {
    border-bottom: solid 1px ${hexToRGBa(COLOURS.WHITE.STANDARD, 0.2)};
    &:last-child {
      border-bottom: none;
    }
  }
`;

export const Navigation = ({ className }: IProps) => {
  const { ships, tutorialStep, goalCrateLocations, rankStatus } = useGameSessionContext();

  return (
    <StyledNavigation className={className}>
      <JumpLink id="fleet" />
      <PlayerSummary />
      {goalCrateLocations.length > 0 && rankStatus.portsVisited >= 850 && <GoalCrate ports={goalCrateLocations} />}
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
              highlight={tutorialStep === 4}
            />
          </li>
        </NavigationList>
      </PlayerOptions>
    </StyledNavigation>
  );
};

const GoalCrate = ({ ports }: { ports: IPort[] }) => {
  return (
    <StyledGoal>
      <StyledGoalIcon>🎷</StyledGoalIcon>
      <StyledGoalText>
        Spotted near:
        <br />
        {ports.map((g) => g.name).join(", ")}
      </StyledGoalText>
    </StyledGoal>
  );
};

const StyledGoal = styled.div`
  display: flex;
  padding: ${GRID.UNIT} ${GRID.UNIT} ${GRID.UNIT} ${GRID.HALF};
  border-left: solid transparent ${GRID.HALF};
  min-height: ${NAV_ITEM_HEIGHT};
  align-items: center;
  color: ${COLOURS.WHITE.STANDARD};
  border-top: solid 1px ${hexToRGBa(COLOURS.WHITE.STANDARD, 0.2)};
`;

const StyledGoalIcon = styled.div`
  width: 32px;
  margin-right: ${GRID.UNIT};
  text-align: center;
  line-height: 32px;
  border-radius: 32px;
  background ${COLOURS.BLACK.FULL};
`;

const StyledGoalText = styled.span`
  flex: 1;
`;
