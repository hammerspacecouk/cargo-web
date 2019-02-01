import * as React from "react";
import { IEvent } from "../../../Interfaces";
import { PlayerFlag } from "../PlayerFlag/PlayerFlag";
import { Event, EventFlag } from "./Event";

interface IProps {
  readonly event: IEvent;
  readonly firstPerson?: boolean;
}

export const EffectUse = ({firstPerson, event}: IProps) => {
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

  const effectName = event.effect ? <em>{event.effect.name}</em> : 'unknown';

  const onShip = event.ship ? ` for ${event.ship.name}` : null;

  return (
    <Event time={event.time}>
      {name} activated {effectName}{onShip}
    </Event>
  );
};
