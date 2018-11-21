import * as React from "react";
import styled from "styled-components";
import { useSessionContext } from "../../../context/SessionContext";
import PlayerFlag from "../../Player/PlayerFlag";
import FleetShips from "../../Ship/FleetShips";
import DestroyedShips from "../../Ship/DestroyedShips";
import EventsList from "../../Events/EventsList";
import Rank from "../../Player/Rank";
import { FleetContextProvider, useFleetContext } from "../../../context/Page/FleetContext";
import { EventsArea } from "../PlayPage";
import { colours, grid } from "../../../GlobalStyle";

const StyledFleetPage = styled.div`
  padding: ${grid.unit}px;
`;

const StyledFlagWrapper = styled.div`
  display: block;
  margin: ${grid.unit}px auto;
  width: 100%;
  border: solid 2px ${colours.white}
  max-width: 320px;
`;
const Title = styled.h1`
  text-align: center;
  margin-bottom: ${grid.unit}px;
`;

const FleetPageContent = () => {
  const { activeShips, destroyedShips, events, refresh } = useFleetContext();
  const { player, rankStatus } = useSessionContext();

  React.useEffect(() => {
    refresh();
  }, []);

  return (
    <StyledFleetPage>
      <StyledFlagWrapper>
        <PlayerFlag player={player}/>
      </StyledFlagWrapper>
      <Title>My Fleet</Title>
      <FleetShips ships={activeShips}/>
      <DestroyedShips ships={destroyedShips}/>
      <Rank rankStatus={rankStatus}/>
      <EventsArea>
        <EventsList events={events} firstPerson/>
      </EventsArea>
    </StyledFleetPage>
  );
};

export default function FleetPage() {
  return (
    <FleetContextProvider>
      <FleetPageContent/>
    </FleetContextProvider>
  )
}
