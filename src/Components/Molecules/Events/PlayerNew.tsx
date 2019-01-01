import * as React from "react";
import { EventInterface } from "../../../Interfaces";
import Event, { EventFlag } from "./Event";
import PlayerFlag from "../PlayerFlag/PlayerFlag";

interface Props {
  readonly event: EventInterface;
  readonly firstPerson?: boolean;
}

export const PlayerNew = (props: Props) => {
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
