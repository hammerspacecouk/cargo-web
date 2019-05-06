import * as React from "react";
import { Event, IEventProps } from "./Event";
import { CrateContents } from "../../Atoms/CrateContents/CrateContents";

export const CrateNew = ({ firstPerson, event, onAnimated }: IEventProps) => {
  let you = "";
  if (firstPerson) {
    you = " for you ";
  }

  const contents = event.crate ? event.crate.contents : "[deleted]";

  return (
    <Event time={event.time} onAnimated={onAnimated}>
      A new crate containing <CrateContents>{contents}</CrateContents> is ready{" "}
      {you} to transport
    </Event>
  );
};
