import * as React from "react";
import ShipInterface from "../../interfaces/ShipInterface";
import ScoreContainer from "../../Containers/Player/ScoreContainer";
import PlayerFlag from "../Player/PlayerFlag";
import ProgressBar from "../Element/ProgressBar";

export interface Props {
  ships: ShipInterface[];
}

export default (props: Props) => {
  if (props.ships.length === 0) {
    return null;
  }

  let players: React.ReactElement<HTMLLIElement>[] = [];
  props.ships.forEach((ship: ShipInterface) => {
    players.push(
      <li key={ship.id} className="player-list__ship">
        <div className="player-list__flag">
          <PlayerFlag player={ship.owner} />
          <ProgressBar percent={ship.strengthPercent} isHealth={true} />
        </div>
        <div className="player-list__detail">
          <h4>{ship.name}</h4>
          <ScoreContainer score={ship.owner.score} />
        </div>
      </li>
    );
  });

  return <ul className="player-list">{players}</ul>;
};
