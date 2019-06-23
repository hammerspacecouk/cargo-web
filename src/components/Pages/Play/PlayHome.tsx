import * as React from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../styles/media";
import { COLOURS, hexToRGBa } from "../../../styles/colours";
import { Panel } from "../../Molecules/Panel";
import { EventsList } from "../../Organisms/EventsList";
import { useGameSessionContext } from "../../../contexts/GameSessionContext/GameSessionContext";

const StyledArea = styled.div`
  ${BREAKPOINTS.XL`
    display: flex;
    height: 100%;
    `};
`;

const EventsPanel = styled(Panel)`
  background: ${COLOURS.EVENTS.BACKGROUND};
  border-color: ${hexToRGBa(COLOURS.BODY.TEXT, 0.2)};
  border-bottom-style: solid;
  border-bottom-width: 1px;
  ${BREAKPOINTS.XL`
    flex: 1;
    border-bottom: none;
    border-right-style: solid;
    border-right-width: 1px;
    `};
`;

const Progress = styled(Panel)`
  ${BREAKPOINTS.XL`
    width: 40%;
    min-width: 320px;
    `};
`;

export const PlayHome = () => {
  const { events } = useGameSessionContext();

  return (
    <StyledArea>
      <EventsPanel title="Captain's Log">
        <EventsList events={events} />
      </EventsPanel>
      <Progress title="Progress">Contnets</Progress>
    </StyledArea>
  );
};
