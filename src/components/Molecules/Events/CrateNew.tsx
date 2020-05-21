import * as React from "react";
import { Event, IEventProps } from "./Event";
import { CrateContents } from "@src/components/Atoms/CrateContents";

export const CrateNew = ({ firstPerson, event }: IEventProps) => {
  let you = "";
  if (firstPerson) {
    you = " for you ";
  }

  const contents = event.crate ? event.crate.contents : "[deleted]";

  return (
    <Event time={event.time}>
      A new crate containing <CrateContents>{contents}</CrateContents> is ready {you} to transport
    </Event>
  );
};
