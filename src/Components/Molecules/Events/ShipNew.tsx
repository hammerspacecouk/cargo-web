import * as React from "react";
import EventInterface from "../../../interfaces/EventInterface";
import Event from "./Event";

interface Props {
  readonly event: EventInterface;
  readonly firstPerson?: boolean;
}

export default (props: Props) => {
  let name;
  if (props.event.ship) {
    name = props.event.ship.name;
  } else {
    name = "[deleted] ";
  }

  return (
    <Event time={props.event.time}>
      <em>{name}</em> was launched
    </Event>
  );
};
