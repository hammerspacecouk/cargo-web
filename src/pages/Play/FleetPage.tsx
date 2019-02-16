import * as React from "react";
import styled from "styled-components";
import { EventsList } from "../../components/Organisms/EventsList/EventsList";
import { FleetShips } from "../../components/Organisms/FleetShips/FleetShips";
import { PlayerRank } from "../../components/Organisms/PlayerRank/PlayerRank";
import {
  FleetContextProvider,
  useFleetContext,
} from "../../context/Page/FleetContext";
import { useSessionContext } from "../../context/SessionContext";
import { GRID, MAX_CONTENT_WIDTH } from "../../styles/variables";
import { Hidden } from "../../components/Atoms/Hidden/Hidden";
import { BREAKPOINTS } from "../../styles/media";
import { useCurrentView } from "../../hooks/useCurrentView";

export const VIEW_NAME = "VIEW_FLEET_PAGE";

const StyledFleetPage = styled.div`
  margin: 0 auto;
  max-width: ${MAX_CONTENT_WIDTH};
  ${BREAKPOINTS.M`
    padding: ${GRID.UNIT};
  `}
`;

const FleetPageContent = () => {
  const { ships, events, refresh } = useFleetContext();
  const { player, rankStatus } = useSessionContext();
  useCurrentView(VIEW_NAME);

  React.useEffect(() => {
    refresh();
  }, []);

  return (
    <StyledFleetPage>
      <Hidden as="h1">Fleet</Hidden>
      <FleetShips ships={ships} />
      <PlayerRank player={player} rankStatus={rankStatus} />
      <EventsList events={events} firstPerson={true} />
    </StyledFleetPage>
  );
};

export const FleetPage = () => (
  <FleetContextProvider>
    <FleetPageContent />
  </FleetContextProvider>
);
