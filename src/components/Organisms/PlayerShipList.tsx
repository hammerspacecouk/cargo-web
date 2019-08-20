import * as React from "react";
import { IOtherShip } from "../../interfaces";
import { Loading } from "../Atoms/Loading";
import { PlayerShip } from "../Molecules/PlayerShip";
import { ListLined } from "../Atoms/List/ListLined";

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
