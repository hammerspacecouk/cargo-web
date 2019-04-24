import { useState } from "react";
import { IShip } from "../Interfaces";

export interface IActiveShip {
  ship?: IShip;
  currentView?: string;
  setCurrentView: (string) => void;
}

export enum View {
  DETAIL,
  DIRECTIONS,
}

export const useActiveShip = (ship: IShip): IActiveShip => {
  const [currentView, setCurrentView] = useState(undefined);

  return {
    ship,
    setCurrentView,
    currentView
  };
};
