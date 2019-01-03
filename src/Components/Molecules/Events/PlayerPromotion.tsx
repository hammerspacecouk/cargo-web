import * as React from "react";
import { IEvent } from "../../../Interfaces";
import { PlayerFlag } from "../PlayerFlag/PlayerFlag";
import { Event } from "./Event";

interface IProps {
  readonly event: IEvent;
  readonly firstPerson?: boolean;
}

export const PlayerPromotion = (props: IProps) => {
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

  return (
    <Event time={props.event.time}>
      {name} promoted to <strong>{props.event.rank.title}</strong>
    </Event>
  );
};
