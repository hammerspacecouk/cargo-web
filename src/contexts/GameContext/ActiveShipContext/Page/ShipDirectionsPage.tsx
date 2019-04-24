import * as React from "react";
import { View } from "../../../../hooks/useActiveShip";
import { useActiveShipView } from "../ActiveShipContext";

export const ShipDirectionsPage = () => {
  useActiveShipView(View.DIRECTIONS);

  return (
    <div>ShipDirections</div>
  );
};
