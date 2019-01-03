import * as React from "react";
import { IEvent } from "../../../Interfaces";
import { Event } from "./Event";

interface IProps {
  readonly event: IEvent;
  readonly firstPerson?: boolean;
}

export const ShipDeparture = (props: IProps) => {
  const port = props.event.port;

  let name = "[deleted]";
  if (props.event.actioningShip) {
    name = props.event.actioningShip.name;
  }

  // todo - new event type if you are headed for the void - and achievement
  return (
    <Event time={props.event.time}>
      <em>{name}</em> departed <a href={`/ports/${port.id}`}>{port.name}</a>{" "}
      headed into open space
    </Event>
  );
};
