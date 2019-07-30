import * as React from "react";
import { Event, IEventProps } from "./Event";

export const ShipDeparture = ({ event }: IEventProps) => {
  const port = event.port;

  let name = "[deleted]";
  if (event.actioningShip) {
    name = event.actioningShip.name;
  }

  return (
    <Event time={event.time}>
      <em>{name}</em> departed {port.name} headed into open space
    </Event>
  );
};
