import * as React from "react";
import EventInterface from "../../DomainInterfaces/EventInterface";
import Event from "./Event";

interface Props {
  readonly event: EventInterface;
  readonly firstPerson?: boolean;
}

export default (props: Props) => {
  const port = props.event.port;
  return (
    <Event time={props.event.time}>
      <em>{props.event.actioningShip.name}</em> arrived at{' '}
      <a href={`/ports/${port.id}`}>{port.name}</a>
    </Event>
  );
};
