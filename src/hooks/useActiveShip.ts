import { useState } from "react";
import { IShip } from "../Interfaces";

export interface IActiveShip {
  ship?: IShip;
}

export const useActiveShip = (ship: IShip): IActiveShip => {
  return {
    ship
  };
};
