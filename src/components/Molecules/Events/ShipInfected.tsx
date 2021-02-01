import * as React from "react";
import { Event, EventShipName, IEventProps } from "./Event";

export const ShipInfected = ({ event }: IEventProps) => {
  return (
    <Event time={event.time}>
      <em>
        <EventShipName ship={event.ship} />
      </em>{" "}
      caught the Stellar Plague from{" "}
      <em>
        <EventShipName ship={event.actioningShip} />
      </em>{" "}
      at {event.port.name}
    </Event>
  );
};
