import * as React from "react";
import { Event, IEventProps } from "./Event";

export const ShipInfected = ({ event }: IEventProps) => {
  let shipName = "[deleted]";
  if (event.actioningShip) {
    shipName = event.actioningShip.name;
  }
  let victimShipName = "[deleted]";
  if (event.ship) {
    victimShipName = event.ship.name;
  }

  return (
    <Event time={event.time}>
      <em>{victimShipName}</em> caught the Space Plague from <em>{shipName}</em> at {event.port.name}
    </Event>
  );
};
