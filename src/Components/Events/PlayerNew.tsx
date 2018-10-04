import * as React from "react";
import EventInterface from "../../DomainInterfaces/EventInterface";
import Event from "./Event";
import PlayerFlag from "../Player/PlayerFlag";

interface Props {
  readonly event: EventInterface;
  readonly firstPerson?: boolean;
}

export default (props: Props) => {
  let name;
  if (props.firstPerson) {
    name = "You ";
  } else if (props.event.actioningPlayer) {
    name = (
      <span className="events__flag">
        <PlayerFlag player={props.event.actioningPlayer} />
      </span>
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
