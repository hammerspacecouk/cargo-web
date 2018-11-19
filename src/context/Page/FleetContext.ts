import { createContext, createElement, useContext, useState } from "react";
import { ChildrenPropsInterface } from "../../interfaces/PropsInterface";
import ShipInterface from "../../interfaces/ShipInterface";
import EventInterface from "../../interfaces/EventInterface";
import { ApiClient } from "../../util/ApiClient";
import { useAllowUpdate } from "../../hooks/useAllowUpdate";
import { useSessionContext } from "../SessionContext";
import FleetShipInterface from "../../interfaces/ShipInterface";
import ShipNameTokenInterface from "../../interfaces/ShipNameTokenInterface";

interface FleetResponseInterface {
  activeShips: FleetShipInterface[];
  destroyedShips: ShipInterface[];
  events: EventInterface[];
}

interface FleetContextInterface {
  activeShips: ShipInterface[];
  destroyedShips: ShipInterface[];
  events: EventInterface[];
  updateRenameToken: (id: string, token: ShipNameTokenInterface) => void;
  setFleetData: (data: FleetShipInterface) => void;
  refresh: () => void;
}

const FleetContext = createContext({});

export const FleetContextProvider = ({
  children
}: ChildrenPropsInterface) => {

  const {setSession} = useSessionContext();
  const [activeShips, setActiveShips] = useState(undefined);
  const [destroyedShips, setDestroyedShips] = useState(undefined);
  const [events, setEvents] = useState(undefined);
  const allowUpdate = useAllowUpdate();

  const updateRenameToken = (id: string, token: ShipNameTokenInterface) => {
    const ships = activeShips.slice(0);
    const len = ships.length;
    for (let i = 0; i < len; i++) {
      if (ships[i].ship.id === id) {
        ships[i].renameToken = token;
      }
    }
    setActiveShips(ships);
  };

  const setFleetData = (data: FleetResponseInterface) => {
    setActiveShips(data.activeShips);
    setDestroyedShips(data.destroyedShips);
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
        activeShips,
        destroyedShips,
        events,
        setFleetData,
        updateRenameToken,
        refresh
      }
    },
    children
  );
};


export const useFleetContext = (): FleetContextInterface => {
  return useContext(FleetContext) as FleetContextInterface;
};
