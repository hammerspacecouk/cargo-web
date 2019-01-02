import * as React from "react";
import { IEvent } from "../../../Interfaces";
import PlayerFlag from "../PlayerFlag/PlayerFlag";
import Event, { EventFlag } from "./Event";

interface IProps {
  readonly event: IEvent;
  readonly firstPerson?: boolean;
}

export const PlayerNew = (props: IProps) => {
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

  const port = props.event.port;

  return (
    <Event time={props.event.time}>
      {name} started a new game at <a href={`/ports/${port.id}`}>{port.name}</a>
    </Event>
  );
};
