import * as React from "react";
import styled from "styled-components";
import { useCurrentShipContext } from "../../context/CurrentShipContext";
import {
PlayPortContextProvider,
usePlayPortContext
} from "../../context/Page/PlayPortContext";
import {PlayerShipList} from "../../components/Organisms/PlayerShipList/PlayerShipList";
import EventsList from "../../components/Organisms/EventsList/EventsList";
import Welcome from "./Port/Welcome";
import { Crates } from "./Port/Crates";
import Directions from "./Port/Directions";
import CrateModal from "./Port/CrateModal";
import { GRID, MAX_CONTENT_WIDTH } from "../../styles/variables";

const PortTemplate = styled.div`
  margin: 0 auto;
  max-width: ${MAX_CONTENT_WIDTH};
  padding: ${GRID.UNIT};
`;

const PortComponent = () => {
  const { shipsInLocation, events } = useCurrentShipContext();
  const { departing } = usePlayPortContext();

  let portContent;
  if (departing) {
    portContent = <div>Departing...</div>; // todo - nice departing animations
  } else {
    portContent = (
      <>
        <Welcome />
        <Crates />
        <Directions />

        <h2>Players</h2>
        <PlayerShipList ships={shipsInLocation} />
        <EventsList events={events} />
        <CrateModal />
      </>
    );
  }

  return (
    <PortTemplate>
      {portContent}
    </PortTemplate>
  );
};

export default () => (
  <PlayPortContextProvider>
    <PortComponent />
  </PlayPortContextProvider>
);
