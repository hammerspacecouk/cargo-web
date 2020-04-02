import { createContext, createElement, ReactNode, useContext } from "react";
import { IActiveShip, useActiveShip } from "./useActiveShip";
import { IActiveShipResponse } from "../../data/active-ship";
import ErrorPage from "../../pages/_error";

// hook to use for getting at the active ship context
export const useActiveShipContext = (): IActiveShip => {
  const context = useContext(ActiveShipContext) as IActiveShip;
  if (!context) {
    throw new Error("useActiveShipContext called outside of the provider");
  }
  return context;
};

// responsible for being the session provider
export const ActiveShipContextComponent = ({ shipId, initialShipData, children }: IProps) => {
  const activeShip = useActiveShip(shipId, initialShipData);

  if (activeShip.ship === null) {
    return createElement(ErrorPage, { statusCode: 404 });
  }

  return createElement(
    ActiveShipContext.Provider,
    {
      value: activeShip,
    },
    children
  );
};

interface IProps {
  shipId: string;
  initialShipData?: IActiveShipResponse;
  children?: ReactNode;
}

const ActiveShipContext = createContext({});
