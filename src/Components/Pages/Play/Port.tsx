import * as React from "react";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import {
  PlayPortContextProvider,
  usePlayPortContext
} from "../../../context/Page/PlayPortContext";
import ShipList from "../../Ship/ShipList";
import EventsList from "../../Events/EventsList";
import Welcome from "./Port/Welcome";
import Crates from "./Port/Crates";
import Directions from "./Port/Directions";
import ShieldIcon from "../../Icons/ShieldIcon";
import CrateModal from "./Port/CrateModal";

const PortComponent = () => {
  const { port, shipsInLocation, events } = useCurrentShipContext();
  const { departing } = usePlayPortContext();

  let safe = null;
  if (port.safeHaven) {
    safe = (
      <abbr title="Safe Haven" className="icon icon--mid">
        <ShieldIcon/>
      </abbr>
    );
  }

  let portContent;
  if (departing) {
    portContent = <div>Departing...</div>; // todo - nice departing animations
  } else {
    portContent = (
      <>
        <Welcome/>
        <Crates/>
        <Directions/>

        <h2>Players</h2>
        <ShipList ships={shipsInLocation}/>
        <EventsList events={events}/>
        <CrateModal/>
      </>
    );
  }

  return (
    <div>
      <h1>
        {port.name} {safe}
      </h1>
      {portContent}
    </div>
  );
};

export default () => (
  <PlayPortContextProvider>
    <PortComponent/>
  </PlayPortContextProvider>
);
