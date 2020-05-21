import * as React from "react";
import { PlayerFlag } from "@src/components/Molecules/PlayerFlag";
import { Event, EventFlag, IEventProps } from "./Event";

export const EffectUse = ({ firstPerson, event }: IEventProps) => {
  let name;
  if (firstPerson) {
    name = "You ";
  } else if (event.actioningPlayer) {
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

  const effectName = event.effect ? <em>{event.effect.name}</em> : "unknown";

  const onShip = event.ship ? ` for ${event.ship.name}` : null;

  return (
    <Event time={event.time}>
      {name} activated {effectName}
      {onShip}
    </Event>
  );
};
