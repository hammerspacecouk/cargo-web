import * as React from "react";
import { IEvent } from "../../../Interfaces";
import { Event } from "./Event";

interface IProps {
  readonly event: IEvent;
  readonly firstPerson?: boolean;
}

export const ShipRename = (props: IProps) => {
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
