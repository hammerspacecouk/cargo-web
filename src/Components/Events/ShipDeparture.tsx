import * as React from "react";
import EventInterface from "../../interfaces/EventInterface";
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

  // todo - new event type if you are headed for the void - and achievement
  return (
    <Event time={props.event.time}>
      <em>{name}</em> departed <a href={`/ports/${port.id}`}>{port.name}</a>{" "}
      headed into open space
    </Event>
  );
};
