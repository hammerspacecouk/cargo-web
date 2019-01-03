import * as React from "react";
import { IEvent } from "../../../Interfaces";
import { Event } from "./Event";

interface IProps {
  readonly event: IEvent;
  readonly firstPerson?: boolean;
}

export const ShipNew = (props: IProps) => {
  let name = "[deleted]";
  if (props.event.ship) {
    name = props.event.ship.name;
  }

  return (
    <Event time={props.event.time}>
      <em>{name}</em> was launched
    </Event>
  );
};
