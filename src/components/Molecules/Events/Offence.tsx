import * as React from "react";
import { Event, IEventProps } from "./Event";

export const Offence = ({ event }: IEventProps) => {
  let shipName = "[deleted]";
  if (event.actioningShip) {
    shipName = event.actioningShip.name;
  }
  let victimShipName = "[deleted]";
  if (event.ship) {
    victimShipName = event.ship.name;
  }

  return (
    <Event time={event.time}>
      <em>{shipName}</em> used <strong>{event.effect.name}</strong> against <em>{victimShipName}</em> ({event.value}{" "}
      damage)
    </Event>
  );
};
