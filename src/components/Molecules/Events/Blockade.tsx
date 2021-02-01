import * as React from "react";
import { Event, EventPlayerName, IEventProps } from "./Event";

export const Blockade = ({ firstPerson, event }: IEventProps) => {
  let name;
  if (firstPerson) {
    name = "You ";
  } else {
    name = <EventPlayerName player={event.actioningPlayer} />;
  }

  return (
    <Event time={event.time}>
      {name} blockaded <em>{event.port.name}</em>
    </Event>
  );
};
