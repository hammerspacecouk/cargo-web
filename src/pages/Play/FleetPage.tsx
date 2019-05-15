import * as React from "react";
import styled from "styled-components";
import { EventsList } from "../../components/Organisms/EventsList/EventsList";
import { FleetShips } from "../../contexts/GameContext/Components/FleetShips";
import { PlayerRank } from "../../components/Organisms/PlayerRank/PlayerRank";
import {
  FleetContextProvider,
  useFleetContext,
} from "../../context/Page/FleetContext";
import { useSessionContext } from "../../context/SessionContext";
import { GRID, MAX_CONTENT_WIDTH } from "../../styles/variables";
import { Hidden } from "../../components/Atoms/Hidden/Hidden";
import { BREAKPOINTS } from "../../styles/media";
import { ContentPanel } from "../../components/Molecules/ContentPanel/ContentPanel";

const StyledFleetPage = styled.div`
  margin: 0 auto;
  max-width: ${MAX_CONTENT_WIDTH};
  ${BREAKPOINTS.M`
    padding: ${GRID.UNIT};
  `}
`;

/** @deprecated */
const FleetPageContent = () => {
  const { ships, events, refresh } = useFleetContext();
  const { player, rankStatus } = useSessionContext();

  React.useEffect(() => {
    refresh();
  }, []);

  return (
    <StyledFleetPage>
      <Hidden as="h1">Fleet</Hidden>
      <FleetShips fleetShips={ships} />
      <PlayerRank player={player} rankStatus={rankStatus} />

      <ContentPanel panelTitle="Captain's Log">
        <EventsList events={events} firstPerson={true} />
      </ContentPanel>
    </StyledFleetPage>
  );
};

export const FleetPage = () => (
  <FleetContextProvider>
    <FleetPageContent />
  </FleetContextProvider>
);
