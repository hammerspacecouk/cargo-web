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
      <em>{props.event.ship.name}</em> was launched
    </Event>
  );
};
