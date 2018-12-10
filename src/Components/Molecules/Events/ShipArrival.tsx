import * as React from "react";
import EventInterface from "../../../interfaces/EventInterface";
import Event from "./Event";

interface Props {
  readonly event: EventInterface;
  readonly firstPerson?: boolean;
}

export default (props: Props) => {
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
