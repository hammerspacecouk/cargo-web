import * as React from "react";
import { Event, EventShipName, IEventProps } from "./Event";

export const Offence = ({ destroyed, event }: IProps) => {
  let destroyedText = "";
  if (destroyed) {
    destroyedText = " and destroyed it";
  }

  return (
    <Event time={event.time}>
      <em>
        <EventShipName ship={event.actioningShip} />
      </em>{" "}
      used <strong>{event.effect.name}</strong> ({event.value} damage) against{" "}
      <em>
        <EventShipName ship={event.ship} />
      </em>
      {destroyedText}
    </Event>
  );
};

interface IProps extends IEventProps {
  destroyed?: boolean;
}
