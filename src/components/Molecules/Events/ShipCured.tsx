import * as React from "react";
import { Event, IEventProps } from "./Event";

export const ShipCured = ({ event }: IEventProps) => {
  let victimShipName = "[deleted]";
  if (event.ship) {
    victimShipName = event.ship.name;
  }

  return (
    <Event time={event.time}>
      <em>{victimShipName}</em> was cured of the Stellar Plague at {event.port.name}
    </Event>
  );
};
