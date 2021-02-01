import * as React from "react";
import { CrateContents } from "@src/components/Atoms/CrateContents";
import { Event, EventShipName, IEventProps } from "./Event";

export const CratePickup = ({ event }: IEventProps) => {
  const contents = event.crate ? event.crate.contents : "[deleted]";
  return (
    <Event time={event.time}>
      <EventShipName ship={event.actioningShip} /> picked up <CrateContents>{contents}</CrateContents> for transport
    </Event>
  );
};
