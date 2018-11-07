import * as React from "react";
import EventInterface from "../../interfaces/EventInterface";
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

  const contents = event.crate ? event.crate.contents : "[deleted]";

  return (
    <Event time={event.time}>
      A new crate containing {contents} is ready {you} to transport
    </Event>
  );
};
