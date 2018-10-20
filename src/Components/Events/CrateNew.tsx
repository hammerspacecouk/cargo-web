import * as React from "react";
import EventInterface from "../../DomainInterfaces/EventInterface";
import Event from "./Event";

interface Props {
  readonly event: EventInterface;
  readonly firstPerson?: boolean;
}

export default ({ firstPerson, event }: Props) => {
  let you = "";
  if (firstPerson) {
    you = " for you ";
  }

  return (
    <Event time={event.time}>
      A new crate containing {event.crate.contents} is ready {you} to transport
    </Event>
  );
};
