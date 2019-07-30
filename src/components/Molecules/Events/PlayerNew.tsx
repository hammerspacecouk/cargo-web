import * as React from "react";
import { PlayerFlag } from "../PlayerFlag";
import { Event, EventFlag, IEventProps } from "./Event";

export const PlayerNew = ({ event, firstPerson }: IEventProps) => {
  let name;
  if (firstPerson) {
    name = "You ";
  } else if (event.actioningPlayer) {
    name = (
      <EventFlag>
        <PlayerFlag player={event.actioningPlayer} />
      </EventFlag>
    );
  } else {
    name = "[deleted] ";
  }

  const port = event.port;

  return (
    <Event time={event.time}>
      {name} started a new game at {port.name}
    </Event>
  );
};
