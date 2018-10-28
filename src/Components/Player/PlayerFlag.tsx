import * as React from "react";
import PlayerInterface from "../../interfaces/PlayerInterface";
import {Environment} from "../../util/Environment";

export interface Props {
  player: PlayerInterface;
}

export default ({ player }: Props) => {
  let img;
  if (player) {
    img = <img src={`${Environment.apiHostname}${player.emblem}`} alt="" />;
  }
  // todo - aspect ratio
  return (
    <div className="emblem">
      {img}
    </div>
  );
};
