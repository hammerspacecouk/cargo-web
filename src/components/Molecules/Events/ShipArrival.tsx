import * as React from "react";
import { Event, EventShipName, IEventProps } from "./Event";

export const ShipArrival = ({ event }: IEventProps) => {
  const port = event.port;
  return (
    <Event time={event.time}>
      <em>
        <EventShipName ship={event.actioningShip} />
      </em>{" "}
      arrived safely at {port.name}
    </Event>
  );
};
