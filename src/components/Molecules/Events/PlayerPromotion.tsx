import * as React from "react";
import { PlayerFlag } from "../PlayerFlag/PlayerFlag";
import { Event, EventFlag, IEventProps } from "./Event";

export const PlayerPromotion = ({ event, firstPerson, onAnimated }: IEventProps) => {
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
    <Event time={event.time} onAnimated={onAnimated}>
      {name} promoted to <strong>{event.rank.title}</strong>
    </Event>
  );
};
