import * as React from "react";
import ShipInterface from "../../interfaces/ShipInterface";
import PlayerFlag from "../Player/PlayerFlag";
import ProgressBar from "../Element/ProgressBar";
import Score from "../../containers/Player/Score";
import Loading from "../Navigation/Loading";

export interface Props {
  ships: ShipInterface[];
}

export default ({ships}: Props) => {
  if (ships === undefined) {
    return <Loading />
  } // todo - pretty loader

  if (ships.length === 0) {
    return null;
  }

  let players: React.ReactElement<HTMLLIElement>[] = [];
  ships.forEach((ship: ShipInterface) => {
    players.push(
      <li key={ship.id} className="player-list__ship">
        <div className="player-list__flag">
          <PlayerFlag player={ship.owner} />
          <ProgressBar percent={ship.strengthPercent} isHealth={true} />
        </div>
        <div className="player-list__detail">
          <h4>{ship.name}</h4>
          <Score score={ship.owner.score} />
        </div>
      </li>
    );
  });

  return <ul className="player-list">{players}</ul>;
};
