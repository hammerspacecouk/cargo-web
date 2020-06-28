import { createContext, createElement, ReactNode, useContext } from "react";
import { IActiveShip, useActiveShip } from "./useActiveShip";
import { IActiveShipResponse } from "@src/data/active-ship";
import { ShipGonePage } from "@src/components/Pages/Play/ActiveShip/ShipGonePage";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import { TrialExpiredPage } from "@src/components/Pages/Play/ActiveShip/TrialExpiredPage";

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
  const { showTrialEnded } = useGameSessionContext();
  const activeShip = useActiveShip(shipId, initialShipData);

  if (showTrialEnded) {
    return createElement(TrialExpiredPage);
  }

  if (activeShip.ship === null) {
    return createElement(ShipGonePage);
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
