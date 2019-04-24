import * as React from "react";
import { View } from "../../../../hooks/useActiveShip";
import { useActiveShipView } from "../ActiveShipContext";

export const ShipDetailPage = () => {
  useActiveShipView(View.DETAIL);

  return (
    <div>ShipDetail</div>
  );
};
