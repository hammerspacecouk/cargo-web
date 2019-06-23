import * as React from "react";
import { IChildrenProps, IShip } from "../../interfaces";
import { IActiveShip, useActiveShip } from "./useActiveShip";

interface IProps extends IChildrenProps {
  ship?: IShip;
}

const ActiveShipContext = React.createContext({});
export const ShipContextComponent = ({ ship, children }: IProps) => {
  const activeShip = useActiveShip(ship);

  if (activeShip.ship === undefined) {
    return null;
  }

  if (!activeShip.ship) {
    return <div>'NOT FOUND'</div>; // todo - component and status code
  }

  return <ActiveShipContext.Provider value={activeShip}>{children}</ActiveShipContext.Provider>;
};

export const useActiveShipContext = (): IActiveShip => {
  const context = React.useContext(ActiveShipContext) as IActiveShip;
  if (!context) {
    throw "useActiveShipContext called outside of the provider";
  }
  return context;
};
