import * as React from "react";
import { IEvent } from "../../../Interfaces";
import Event from "./Event";

interface IProps {
  readonly event: IEvent;
  readonly firstPerson?: boolean;
}

export default (props: IProps) => {
  let name;
  if (props.event.ship) {
    name = props.event.ship.name;
  } else {
    name = "[deleted] ";
  }

  return (
    <Event time={props.event.time}>
      <em>{name}</em> was launched
    </Event>
  );
};
