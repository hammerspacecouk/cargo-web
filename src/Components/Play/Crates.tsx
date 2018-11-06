import * as React from "react";
import CratesOnShip from "./CratesOnShip";
import CratesAtPort from "./CratesAtPort";

export default () => {
  return (
    <div className="t-port-shipping">
      <CratesOnShip />
      <CratesAtPort />
    </div>
  );
}
