import * as React from "react";
import { IEvent } from "../../../Interfaces";
import { Event } from "./Event";

interface IProps {
  readonly event: IEvent;
  readonly firstPerson?: boolean;
}

export const Offence = (props: IProps) => {
  let shipName = "[deleted]";
  if (props.event.actioningShip) {
    shipName = props.event.actioningShip.name;
  }
  let victimShipName = "[deleted]";
  if (props.event.ship) {
    victimShipName = props.event.ship.name;
  }

  return (
    <Event time={props.event.time}>
      <em>{shipName}</em> used <strong>{props.event.effect.name}</strong>{" "}
      against <em>{victimShipName}</em> ({props.event.value} damage)
    </Event>
  );
};
