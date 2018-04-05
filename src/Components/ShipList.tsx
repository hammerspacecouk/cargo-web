import * as React from 'react';
import ShipInterface from "../DomainInterfaces/ShipInterface";
import ScoreContainer from "../Containers/Common/ScoreContainer";
import PlayerFlag from "./PlayerFlag";

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
                </div>
                <div className="player-list__detail">
                    <h4>{ship.name}</h4>
                    <ScoreContainer score={ship.owner.score} />
                </div>
            </li>
        );
    });

    return (
        <ul className="player-list">{players}</ul>
    );
};
