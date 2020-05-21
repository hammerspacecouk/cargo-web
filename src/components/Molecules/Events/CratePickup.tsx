import * as React from "react";
import { CrateContents } from "@src/components/Atoms/CrateContents";
import { Event, IEventProps } from "./Event";

export const CratePickup = ({ event }: IEventProps) => {
  const contents = event.crate ? event.crate.contents : "[deleted]";
  const name = event.actioningShip ? event.actioningShip.name : "[deleted]";
  return (
    <Event time={event.time}>
      {name} picked up <CrateContents>{contents}</CrateContents> for transport
    </Event>
  );
};
