import * as React from "react";
import EventInterface from "../../interfaces/EventInterface";
import Event from "./Event";

interface Props {
  readonly event: EventInterface;
}

export default ({ event }: Props) => {
  const contents = event.crate ? event.crate.contents : "[deleted]";
  return (
    <Event time={event.time}>
      {event.actioningShip.name} picked up {contents} for transport
    </Event>
  );
};
