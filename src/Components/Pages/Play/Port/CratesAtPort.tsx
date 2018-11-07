import * as React from "react";
import { useCurrentShipContext } from "../../../../context/CurrentShipContext";
import { CrateAtPort } from "./CrateAtPort";

export default () => {
  const { cratesInPort } = useCurrentShipContext();
  return (
    <div className="t-port-crates">
      <h2 className="table-head">Crates at Port</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Contents</th>
            <th>Value</th>
            <th>Pickup</th>
          </tr>
        </thead>
        <tbody>
          {cratesInPort.map(crateAction => {
            <CrateAtPort crateAction={crateAction} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
