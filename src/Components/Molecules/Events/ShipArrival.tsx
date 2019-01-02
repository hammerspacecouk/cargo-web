import * as React from "react";
import { IEvent } from "../../../Interfaces";
import Event from "./Event";

interface IProps {
  readonly event: IEvent;
  readonly firstPerson?: boolean;
}

export default (props: IProps) => {
  const port = props.event.port;

  let name;
  if (props.event.actioningShip) {
    name = props.event.actioningShip.name;
  } else {
    name = "[deleted] ";
  }

  return (
    <Event time={props.event.time}>
      <em>{name}</em> arrived safely at{" "}
      <a href={`/ports/${port.id}`}>{port.name}</a>
    </Event>
  );
};
