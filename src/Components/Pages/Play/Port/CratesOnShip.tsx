import * as React from "react";
import { useCurrentShipContext } from "../../../../context/CurrentShipContext";
import { CrateOnShip, CrateOnShipPlaceholder } from "./CrateOnShip";

export default () => {
  const { ship, cratesOnShip } = useCurrentShipContext();

  const placeholderSlots = new Array(
    ship.shipClass.capacity - cratesOnShip.length
  );
  return (
    <div className="t-port-ship">
      <h2 className="table-head">Crates on Ship</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Contents</th>
            <th>Value</th>
            <th>Drop</th>
          </tr>
        </thead>
        <tbody>
          {cratesOnShip.map(crate => <CrateOnShip crateAction={crate} />)}
          {placeholderSlots.map(() => <CrateOnShipPlaceholder />)}
        </tbody>
      </table>
    </div>
  );
};