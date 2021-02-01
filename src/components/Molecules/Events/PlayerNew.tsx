import * as React from "react";
import { Event, EventPlayerName, IEventProps } from "./Event";

export const PlayerNew = ({ event, firstPerson }: IEventProps) => {
  let name;
  if (firstPerson) {
    name = "You ";
  } else {
    name = <EventPlayerName player={event.actioningPlayer} />;
  }

  const port = event.port;

  return (
    <Event time={event.time}>
      {name} started a new game at {port.name}
    </Event>
  );
};
