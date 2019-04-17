import * as React from "react";
import { Event, IEventProps } from "./Event";

export const ShipArrival = ({event, onAnimated }: IEventProps) => {
  const port = event.port;

  let name = "[deleted]";
  if (event.actioningShip) {
    name = event.actioningShip.name;
  }

  return (
    <Event time={event.time} onAnimated={onAnimated}>
      <em>{name}</em> arrived safely at {port.name}
    </Event>
  );
};
