import * as React from "react";
import ShipInterface from "../../DomainInterfaces/ShipInterface";

export interface Props {
  ships: ShipInterface[];
}

const ship = (ship: ShipInterface) => (
  <tr key={ship.id} className="m-fleet-ship">
    <td className="m-fleet-ship__cell m-fleet-ship__cell--icon">I</td>
    <td className="m-fleet-ship__cell m-fleet-ship__cell--name">
      <div className="m-fleet-ship__meta">
        <div className="m-fleet-ship__name">{ship.name}</div>
        <div className="m-fleet-ship__class">{ship.shipClass.name}</div>
      </div>
    </td>
    <td className="m-fleet-ship__cell m-fleet-ship__cell--location">
      Destroyed at {ship.location.name}
    </td>
  </tr>
);

export default (props: Props) => {
  if (props.ships.length === 0) {
    return null;
  }

  return (
    <div className="o-ships">
      <h2>Destroyed ships</h2>
      <table className="o-ships__list o-ships__list--destroyed">
        <thead className="hidden">
          <tr>
            <th>Class</th>
            <th>Ship Name</th>
            <th>Destroyed at</th>
          </tr>
        </thead>
        <tbody>{props.ships.map(ship)}</tbody>
      </table>
    </div>
  );
};
