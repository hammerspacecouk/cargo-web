import * as React from "react";
import { Event, EventShipName, IEventProps } from "./Event";

export const ShipCured = ({ event }: IEventProps) => {
  return (
    <Event time={event.time}>
      <em>
        <EventShipName ship={event.ship} />
      </em>{" "}
      was cured of the Stellar Plague at {event.port.name}
    </Event>
  );
};
