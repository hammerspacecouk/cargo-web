import * as React from "react";
import EventInterface from "../../DomainInterfaces/EventInterface";
import Event from "./Event";

interface Props {
  readonly event: EventInterface;
}

export default ({ event }: Props) => (
  <Event time={event.time}>
    {event.actioningShip.name} picked up {event.crate.contents} for transport
  </Event>
);
