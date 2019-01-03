import * as React from "react";
import { IEvent } from "../../../Interfaces";
import { Event } from "./Event";

interface IProps {
  readonly event: IEvent;
  readonly firstPerson?: boolean;
}

export const CrateNew = ({ firstPerson, event }: IProps) => {
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
