import * as React from "react";
import EventInterface from "../../DomainInterfaces/EventInterface";
import Event from "./Event";

interface Props {
  readonly event: EventInterface;
  readonly firstPerson?: boolean;
}

export default (props: Props) => {
  return (
    <Event time={props.event.time}>
      <em>{props.event.value}</em> was renamed to{' '}
      <em>{props.event.ship.name}</em>
    </Event>
  );
};
