import * as React from "react";
import styled from "styled-components";
import { useSessionContext } from "../../context/SessionContext";
import PlayerFlag from "../../components/Molecules/PlayerFlag/PlayerFlag";
import FleetShips from "../../components/Organisms/FleetShips/FleetShips";
import EventsList from "../../components/Events/EventsList";
import Rank from "../../components/Player/Rank";
import { FleetContextProvider, useFleetContext } from "../../context/Page/FleetContext";
import { EventsArea } from "../PlayPage";
import { colours, grid } from "../../GlobalStyle";

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
  max-width: 128px;
  border: solid 2px ${colours.white};
  border-radius: 50%;
  line-height: 0;
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
  const { ships, events, refresh } = useFleetContext();
  const { player, rankStatus } = useSessionContext();

  React.useEffect(() => {
    refresh();
  }, []);

  return (
    <StyledFleetPage>
      <FleetHeader>
        <Title>My Fleet</Title>
        <StyledFlagWrapper>
          <PlayerFlag player={player}/>
        </StyledFlagWrapper>
      </FleetHeader>
      <FleetShips ships={ships}/>
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
