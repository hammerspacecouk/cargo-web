import * as React from "react";
import { Event, EventFlag, IEventProps } from "./Event";
import { PlayerFlag } from "../PlayerFlag";

export const Blockade = ({ firstPerson, event }: IEventProps) => {
  let name;
  if (firstPerson) {
    name = "You ";
  } else if (event.actioningPlayer) {
    // todo - abstract the name generation
    name = (
      <>
        <EventFlag>
          <PlayerFlag player={event.actioningPlayer} />
        </EventFlag>{" "}
        {event.actioningPlayer.displayName}
      </>
    );
  } else {
    name = "[deleted] ";
  }

  return (
    <Event time={event.time}>
      {name} blockaded <em>{event.port.name}</em>
    </Event>
  );
};
