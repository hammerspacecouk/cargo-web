import { createContext, createElement, ReactNode, useContext } from "react";
import { ILaunchShips, useLaunchShips } from "./useLaunchShips";
import { IShipUpgrade } from "../../interfaces";

// hook to use for getting at the active ship context
export const useLaunchShipsContext = (): ILaunchShips => {
  const context = useContext(LaunchShipsContext) as ILaunchShips;
  if (!context) {
    throw "useLaunchShipsContext called outside of the provider";
  }
  return context;
};

// responsible for being the session provider
export const LaunchShipsContextComponent = ({ children, initialShipsData }: IProps) => {
  const launchShipData = useLaunchShips(initialShipsData);
  return createElement(
    LaunchShipsContext.Provider,
    {
      value: launchShipData,
    },
    children
  );
};

interface IProps {
  initialShipsData: IShipUpgrade[];
  children?: ReactNode;
}

const LaunchShipsContext = createContext({});
