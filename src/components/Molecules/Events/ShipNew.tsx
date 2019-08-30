import * as React from "react";
import { Event, IEventProps } from "./Event";

export const ShipNew = ({ event }: IEventProps) => {
  let name = "[deleted]";
  if (event.ship) {
    name = event.ship.name;
    if (event.ship.shipClass) {
      name = `${name} (${event.ship.shipClass.name})`;
    }
  }

  return (
    <Event time={event.time}>
      <em>{name}</em> was launched at {event.port.name}
    </Event>
  );
};
