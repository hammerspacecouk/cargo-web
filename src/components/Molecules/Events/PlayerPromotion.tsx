import * as React from "react";
import { Event, EventPlayerName, IEventProps } from "./Event";

export const PlayerPromotion = ({ event, firstPerson }: IEventProps) => {
  let name;
  if (firstPerson) {
    name = "You";
  } else {
    name = <EventPlayerName player={event.actioningPlayer} />;
  }

  return (
    <Event time={event.time}>
      {name} received a promotion to <strong>{event.rank.title}</strong>
    </Event>
  );
};
