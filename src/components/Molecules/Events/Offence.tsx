import * as React from "react";
import { Event, IEventProps } from "./Event";

export const Offence = ({ destroyed, event }: IProps) => {
  let shipName = "[deleted]";
  if (event.actioningShip) {
    shipName = event.actioningShip.name;
  }
  let victimShipName = "[deleted]";
  if (event.ship) {
    victimShipName = event.ship.name;
  }

  let destroyedText = "";
  if (destroyed) {
    destroyedText = " and destroyed it";
  }

  return (
    <Event time={event.time}>
      <em>{shipName}</em> used <strong>{event.effect.name}</strong> ({event.value} damage) against{" "}
      <em>{victimShipName}</em>
      {destroyedText}
    </Event>
  );
};

interface IProps extends IEventProps {
  destroyed?: boolean;
}
