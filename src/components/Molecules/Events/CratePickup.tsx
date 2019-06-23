import * as React from "react";
import { CrateContents } from "../../Atoms/CrateContents";
import { Event, IEventProps } from "./Event";

export const CratePickup = ({ event, onAnimated }: IEventProps) => {
  const contents = event.crate ? event.crate.contents : "[deleted]";
  const name = event.actioningShip ? event.actioningShip.name : "[deleted]";
  return (
    <Event time={event.time} onAnimated={onAnimated}>
      {name} picked up <CrateContents>{contents}</CrateContents> for transport
    </Event>
  );
};
