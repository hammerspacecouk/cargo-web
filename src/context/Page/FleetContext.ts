import { createContext, createElement, useContext, useState } from "react";
import { ChildrenPropsInterface } from "../../interfaces/PropsInterface";
import EventInterface from "../../interfaces/EventInterface";
import { ApiClient } from "../../util/ApiClient";
import { useAllowUpdate } from "../../hooks/useAllowUpdate";
import { useSessionContext } from "../SessionContext";
import {FleetShipInterface} from "../../interfaces/ShipInterface";

interface FleetResponseInterface {
  ships: FleetShipInterface[];
  events: EventInterface[];
}

interface FleetContextInterface {
  ships: FleetShipInterface[];
  events: EventInterface[];
  updateShipName: (id: string, newName: string) => void;
  setFleetData: (data: FleetShipInterface) => void;
  refresh: () => void;
}

const FleetContext = createContext({});

export const FleetContextProvider = ({
  children
}: ChildrenPropsInterface) => {

  const {setSession} = useSessionContext();
  const [ships, setShips] = useState(undefined);
  const [events, setEvents] = useState(undefined);
  const allowUpdate = useAllowUpdate();

  const updateShipName = (id: string, newName: string) => {
    const allShips = ships.slice(0);
      const len = allShips.length;
      for (let i = 0; i < len; i++) {
        if (allShips[i].ship.id === id) {
          allShips[i].name = newName;
        }
      }
      setShips(allShips);
  };

  const setFleetData = (data: FleetResponseInterface) => {
    setShips(data.ships);
    setEvents(data.events);
  };

  const refresh = async () => {
    const data = await ApiClient.fetch("/play");
    if (allowUpdate) {
      setFleetData(data.fleet);
    }
    setSession(data.sessionState);
  };

  return createElement(
    FleetContext.Provider,
    {
      value: {
        ships,
        events,
        setFleetData,
        updateShipName,
        refresh
      }
    },
    children
  );
};


export const useFleetContext = (): FleetContextInterface => {
  return useContext(FleetContext) as FleetContextInterface;
};
