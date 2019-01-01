import * as React from "react";
import { EventInterface } from "../../../Interfaces";
import Event from "./Event";

interface Props {
  readonly event: EventInterface;
  readonly firstPerson?: boolean;
}

export default (props: Props) => {
  if (!props.event.ship) {
    return (
      <Event time={props.event.time}>
        A ship was renamed (but has since been deleted)
      </Event>
    );
  }

  return (
    <Event time={props.event.time}>
      <em>{props.event.value}</em> was renamed to{" "}
      <em>{props.event.ship.name}</em>
    </Event>
  );
};
