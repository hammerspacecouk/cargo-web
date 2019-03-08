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

  return (
    <Event time={props.event.time}>
      <em>{name}</em> departed {port.name} headed into open space
    </Event>
  );
};
