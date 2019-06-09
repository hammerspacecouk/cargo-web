import * as React from "react";
import { IOtherShip } from "../../../Interfaces";
import { Loading } from "../../Atoms/Loading/Loading";
import { PlayerShip } from "../../Molecules/PlayerShip/PlayerShip";
import { ListLined } from "../../Atoms/Lists/ListLined/ListLined";

interface IProps {
  ships: IOtherShip[];
}

export const PlayerShipList = ({ ships }: IProps) => {
  if (ships === undefined) {
    return <Loading />;
  }

  if (ships.length === 0) {
    return null;
  }

  // todo - no tactical options on own ships
  return (
    <ListLined>
      {ships.map(shipItem => (
        <li key={shipItem.ship.id}>
          <PlayerShip ship={shipItem.ship} offence={shipItem.offence} />
        </li>
      ))}
    </ListLined>
  );
};
