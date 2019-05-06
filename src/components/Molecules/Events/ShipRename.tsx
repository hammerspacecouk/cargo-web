import * as React from "react";
import { Event, IEventProps } from "./Event";

export const ShipRename = ({ event, onAnimated }: IEventProps) => {
  if (!event.ship) {
    return (
      <Event time={event.time}>
        A ship was renamed (but has since been deleted)
      </Event>
    );
  }

  return (
    <Event time={event.time} onAnimated={onAnimated}>
      <em>{event.value}</em> was renamed to <em>{event.ship.name}</em>
    </Event>
  );
};
