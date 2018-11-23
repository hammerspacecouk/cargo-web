import * as React from "react";
import styled from "styled-components";
import { useSessionContext } from "../../../context/SessionContext";
import PlayerFlag from "../../Molecules/PlayerFlag/PlayerFlag";
import FleetShips from "../../Organisms/FleetShips/FleetShips";
import DestroyedShips from "../../Ship/DestroyedShips";
import EventsList from "../../Events/EventsList";
import Rank from "../../Player/Rank";
import { FleetContextProvider, useFleetContext } from "../../../context/Page/FleetContext";
import { EventsArea } from "../PlayPage";
import { colours, grid } from "../../../GlobalStyle";

const StyledFleetPage = styled.div`
    padding: ${grid.unit}px;
`;

const FleetHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: ${grid.unit * 2}px;
`;

const StyledFlagWrapper = styled.div`
  display: block;
  margin-left: ${grid.unit}px;
  width: 45%;
  max-width: 240px;
  border: dashed 2px ${colours.cyan[2]};
`;
const Title = styled.h1`
  text-align: left;
  flex: 1;
  font-size: 2rem;
  @media (min-width: 21em) {
    font-size: 3rem;
  }
  @media (min-width: 48.75em) {
    font-size: 4rem;
  }
`;

const FleetPageContent = () => {
  const { activeShips, destroyedShips, events, refresh } = useFleetContext();
  const { player, rankStatus } = useSessionContext();

  React.useEffect(() => {
    refresh();
  }, []);

  return (
    <StyledFleetPage>
      <FleetHeader>
        <Title>My<br />Fleet</Title>
        <StyledFlagWrapper>
          <PlayerFlag player={player}/>
        </StyledFlagWrapper>
      </FleetHeader>
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
