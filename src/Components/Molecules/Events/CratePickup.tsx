import * as React from "react";
import { EventInterface } from "../../../Interfaces";
import Event from "./Event";
import { CrateContents } from "../../Atoms/CrateContents/CrateContents";

interface Props {
  readonly event: EventInterface;
}

export default ({ event }: Props) => {
  const contents = event.crate ? event.crate.contents : "[deleted]";
  const name = event.actioningShip ? event.actioningShip.name : "[deleted]";
  return (
    <Event time={event.time}>
      {name} picked up <CrateContents>{contents}</CrateContents> for transport
    </Event>
  );
};
