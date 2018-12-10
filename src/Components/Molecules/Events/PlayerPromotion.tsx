import * as React from "react";
import EventInterface from "../../../interfaces/EventInterface";
import Event from "./Event";
import PlayerFlag from "../PlayerFlag/PlayerFlag";

interface Props {
  readonly event: EventInterface;
  readonly firstPerson?: boolean;
}

export default (props: Props) => {
  let name;
  if (props.firstPerson) {
    name = "You were ";
  } else if (props.event.actioningPlayer) {
    name = (
      <React.Fragment>
        <span className="events__flag">
          <PlayerFlag player={props.event.actioningPlayer} />
        </span>{" "}
        was{" "}
      </React.Fragment>
    );
  } else {
    name = "[deleted] was ";
  }

  const port = props.event.port;

  return (
    <Event time={props.event.time}>
      {name} promoted to <strong>{props.event.rank.title}</strong>
    </Event>
  );
};
