import * as React from "react";
import { Event, EventShipName, IEventProps } from "./Event";

export const ShipDeparture = ({ event }: IEventProps) => {
  const port = event.port;
  return (
    <Event time={event.time}>
      <em>
        <EventShipName ship={event.actioningShip} />
      </em>{" "}
      departed {port.name} headed into open space
    </Event>
  );
};
