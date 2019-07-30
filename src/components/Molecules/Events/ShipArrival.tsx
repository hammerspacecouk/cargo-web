import * as React from "react";
import { Event, IEventProps } from "./Event";

export const ShipArrival = ({ event }: IEventProps) => {
  const port = event.port;

  let name = "[deleted]";
  if (event.actioningShip) {
    name = event.actioningShip.name;
  }

  return (
    <Event time={event.time}>
      <em>{name}</em> arrived safely at {port.name}
    </Event>
  );
};
