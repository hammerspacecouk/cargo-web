import * as React from "react";
import { Event, EventShipName, IEventProps } from "./Event";

export const ShipNew = ({ event }: IEventProps) => {
  let shipClassName = "";
  if (event?.ship?.shipClass) {
    shipClassName = ` (${event.ship.shipClass.name})`;
  }

  return (
    <Event time={event.time}>
      <em>
        <EventShipName ship={event.ship} />
      </em>
      {shipClassName} was launched at {event.port.name}
    </Event>
  );
};
