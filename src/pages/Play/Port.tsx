import * as React from "react";
import { useCurrentShipContext } from "../../context/CurrentShipContext";
import {
  PlayPortContextProvider,
  usePlayPortContext
} from "../../context/Page/PlayPortContext";
import ShipList from "../../components/Organisms/PlayerShipList/PlayerShipList";
import EventsList from "../../components/Organisms/EventsList/EventsList";
import Welcome from "./Port/Welcome";
import { Crates } from "./Port/Crates";
import Directions from "./Port/Directions";
import ShieldIcon from "../../components/Icons/ShieldIcon/ShieldIcon";
import CrateModal from "./Port/CrateModal";
import Icon from "../../components/Atoms/Icon/Icon";
import { H1 } from "../../components/Atoms/Heading/Heading";
import { GRID, MAX_CONTENT_WIDTH } from "../../styles/variables";
import styled from "styled-components";

const PortTemplate = styled.div`
  margin: 0 auto;
  max-width: ${MAX_CONTENT_WIDTH};
  padding: ${GRID.UNIT};
`;

const PortComponent = () => {
  const { port, shipsInLocation, events } = useCurrentShipContext();
  const { departing } = usePlayPortContext();

  let safe = null;
  if (port.safeHaven) {
    safe = (
      <abbr title="Safe Haven">
        <Icon>
          <ShieldIcon />
        </Icon>
      </abbr>
    );
  }

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
        <ShipList ships={shipsInLocation} />
        <EventsList events={events} />
        <CrateModal />
      </>
    );
  }

  return (
    <PortTemplate>
      <H1>
        {port.name} {safe}
      </H1>
      {portContent}
    </PortTemplate>
  );
};

export default () => (
  <PlayPortContextProvider>
    <PortComponent />
  </PlayPortContextProvider>
);
