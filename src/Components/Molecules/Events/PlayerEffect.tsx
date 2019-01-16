import * as React from "react";
import { IEvent } from "../../../Interfaces";
import { PlayerFlag } from "../PlayerFlag/PlayerFlag";
import { Event, EventFlag } from "./Event";

interface IProps {
  readonly event: IEvent;
  readonly firstPerson?: boolean;
}

export const PlayerEffect = (props: IProps) => {
  let name;
  if (props.firstPerson) {
    name = "You ";
  } else if (props.event.actioningPlayer) {
    name = (
      <EventFlag>
        <PlayerFlag player={props.event.actioningPlayer} />
      </EventFlag>
    );
  } else {
    name = "[deleted] ";
  }

  return (
    <Event time={props.event.time}>
      {name} obtained "{props.event.value}"
    </Event>
  );
};
