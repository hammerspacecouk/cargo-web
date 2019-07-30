import * as React from "react";
import { PlayerFlag } from "../PlayerFlag";
import { Event, EventFlag, IEventProps } from "./Event";

export const PlayerPromotion = ({ event, firstPerson }: IEventProps) => {
  let name;
  if (firstPerson) {
    name = "You were";
  } else if (event.actioningPlayer) {
    name = (
      <>
        <EventFlag>
          <PlayerFlag player={event.actioningPlayer} />
        </EventFlag>{" "}
        was
      </>
    );
  } else {
    name = "[deleted] was";
  }

  return (
    <Event time={event.time}>
      {name} promoted to <strong>{event.rank.title}</strong>
    </Event>
  );
};
