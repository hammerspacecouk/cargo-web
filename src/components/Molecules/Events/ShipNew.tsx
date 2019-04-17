import * as React from "react";
import { Event, IEventProps } from "./Event";

export const ShipNew = ({event, onAnimated }: IEventProps) => {
  let name = "[deleted]";
  if (event.ship) {
    name = event.ship.name;
  }

  return (
    <Event time={event.time} onAnimated={onAnimated}>
      <em>{name}</em> was launched
    </Event>
  );
};
