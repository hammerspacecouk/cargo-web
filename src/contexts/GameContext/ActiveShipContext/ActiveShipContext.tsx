import * as React from "react";
import { IChildrenProps, IShip } from "../../../Interfaces";
import { IActiveShip, useActiveShip } from "./useActiveShip";
import { NotFound } from "../../../components/Organisms/Error/NotFound";

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
    return <NotFound />;
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
