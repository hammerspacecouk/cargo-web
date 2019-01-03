import * as React from "react";
import { IEvent } from "../../../Interfaces";
import { CrateContents } from "../../Atoms/CrateContents/CrateContents";
import { Event } from "./Event";

interface IProps {
  readonly event: IEvent;
}

export const CratePickup = ({ event }: IProps) => {
  const contents = event.crate ? event.crate.contents : "[deleted]";
  const name = event.actioningShip ? event.actioningShip.name : "[deleted]";
  return (
    <Event time={event.time}>
      {name} picked up <CrateContents>{contents}</CrateContents> for transport
    </Event>
  );
};
