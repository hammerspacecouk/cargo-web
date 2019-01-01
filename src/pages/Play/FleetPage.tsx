import * as React from "react";
import styled from "styled-components";
import { useSessionContext } from "../../context/SessionContext";
import PlayerFlag from "../../components/Molecules/PlayerFlag/PlayerFlag";
import FleetShips from "../../components/Organisms/FleetShips/FleetShips";
import { EventsList } from "../../components/Organisms/EventsList/EventsList";
import { PlayerRank } from "../../components/Organisms/PlayerRank/PlayerRank";
import {
  FleetContextProvider,
  useFleetContext
} from "../../context/Page/FleetContext";
import { GRID, MAX_CONTENT_WIDTH } from "../../styles/variables";
import { COLOURS } from "../../styles/colours";
import { H1 } from "../../components/Atoms/Heading/Heading";
import { Square } from "../../components/Atoms/Ratio/Ratio";

const StyledFleetPage = styled.div`
  margin: 0 auto;
  max-width: ${MAX_CONTENT_WIDTH};
  padding: ${GRID.UNIT};
`;

const FleetHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: ${GRID.DOUBLE};
`;

const FlagArea = styled.div`
  display: block;
  margin-left: ${GRID.UNIT};
  width: 45%;
  max-width: 128px;
  border: solid 2px ${COLOURS.BODY.TEXT};
  border-radius: 50%;
`;

const Title = styled(H1)`
  text-align: left;
  flex: 1;
`;

const FleetPageContent = () => {
  const { ships, events, refresh } = useFleetContext();
  const { player, rankStatus } = useSessionContext();

  React.useEffect(() => {
    refresh();
  }, []);

  return (
    <StyledFleetPage>
      <FleetHeader>
        <Title>My Fleet</Title>
        <FlagArea>
          <Square>
            <PlayerFlag player={player} />
          </Square>
        </FlagArea>
      </FleetHeader>
      <FleetShips ships={ships} />
      <PlayerRank rankStatus={rankStatus} />
      <EventsList events={events} firstPerson />
    </StyledFleetPage>
  );
};

export default function FleetPage() {
  return (
    <FleetContextProvider>
      <FleetPageContent />
    </FleetContextProvider>
  );
}
