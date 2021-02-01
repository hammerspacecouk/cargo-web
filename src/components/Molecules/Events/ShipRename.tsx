import * as React from "react";
import { Event, EventShipName, IEventProps } from "./Event";

export const ShipRename = ({ event }: IEventProps) => {
  if (!event.ship) {
    return <Event time={event.time}>A ship was renamed (but has since been deleted)</Event>;
  }

  return (
    <Event time={event.time}>
      <em>{event.value}</em> was renamed to{" "}
      <em>
        <EventShipName ship={event.ship} />
      </em>
    </Event>
  );
};
