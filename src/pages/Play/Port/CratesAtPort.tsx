import * as React from "react";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import { CrateAtPort } from "./CrateAtPort";
import {Loading} from "../../../components/Atoms/Loading/Loading";
import { Table } from "../../../components/Molecules/Table/Table";

export default () => {
  const { cratesInPort } = useCurrentShipContext();

  if (cratesInPort === undefined) {
    return <Loading />;
  } // todo - pretty loader

  return (
    <div className="t-port-crates">
      <h2 className="table-head">Crates at Port</h2>
      <Table>
        <thead>
          <tr>
            <th>Contents</th>
            <th>Value</th>
            <th>Pickup</th>
          </tr>
        </thead>
        <tbody>
          {cratesInPort.map(crateAction => (
            <CrateAtPort key={crateAction.crate.id} crateAction={crateAction} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};
