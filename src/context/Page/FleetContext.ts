import { createContext, createElement, useContext, useState } from "react";
import { ChildrenPropsInterface } from "../../interfaces/PropsInterface";
import EventInterface from "../../interfaces/EventInterface";
import { ApiClient } from "../../util/ApiClient";
import { useSessionContext } from "../SessionContext";
import { FleetShipInterface } from "../../interfaces/ShipInterface";
import { useMounted } from "../../hooks/useMounted";

export interface FleetResponseInterface {
  ships: FleetShipInterface[];
  events: EventInterface[];
}

interface FleetContextInterface {
  ships: FleetShipInterface[];
  events: EventInterface[];
  setFleetData: (data: FleetResponseInterface) => void;
  refresh: () => void;
}

const FleetContext = createContext({});

export const FleetContextProvider = ({ children }: ChildrenPropsInterface) => {
  const { setSession } = useSessionContext();
  const [ships, setShips] = useState(undefined);
  const [events, setEvents] = useState(undefined);
  const isMounted = useMounted();

  const setFleetData = (data: FleetResponseInterface) => {
    setShips(data.ships);
    setEvents(data.events);
  };

  const refresh = async () => {
    const data = await ApiClient.fetch("/play");
    if (isMounted()) {
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
        refresh
      }
    },
    children
  );
};

export const useFleetContext = (): FleetContextInterface => {
  return useContext(FleetContext) as FleetContextInterface;
};
