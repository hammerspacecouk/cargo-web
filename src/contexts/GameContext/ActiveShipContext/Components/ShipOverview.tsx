import * as React from "react";
import { useActiveShipContext } from "../ActiveShipContext";

export const ShipOverview = () => {
  const {ship} = useActiveShipContext();
  return (
    <div>Overview of {ship.name}</div>
  )
};
