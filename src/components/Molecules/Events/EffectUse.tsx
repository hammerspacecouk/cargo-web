import * as React from "react";
import { Event, EventPlayerName, IEventProps } from "./Event";

export const EffectUse = ({ firstPerson, event }: IEventProps) => {
  let name;
  if (firstPerson) {
    name = "You ";
  } else {
    name = <EventPlayerName player={event.actioningPlayer} />;
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
