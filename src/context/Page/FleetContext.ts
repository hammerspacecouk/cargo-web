import { createContext, createElement, useContext, useState } from "react";
import { ChildrenPropsInterface } from "../../interfaces/PropsInterface";
import ShipInterface from "../../interfaces/ShipInterface";
import EventInterface from "../../interfaces/EventInterface";
import { ApiClient } from "../../util/ApiClient";
import { useAllowUpdate } from "../../hooks/useAllowUpdate";
import { useSessionContext } from "../SessionContext";
import FleetShipInterface from "../../interfaces/ShipInterface";


interface FleetContextInterface {
  activeShips: ShipInterface[];
  destroyedShips: ShipInterface[];
  events: EventInterface[];
  setData: (data: FleetShipInterface) => void;
  refresh: () => void;
}

const FleetContext = createContext({});

export const FleetContextProvider = () => ({
  children
}: ChildrenPropsInterface
) => {

  const {setSession} = useSessionContext();
  const [activeShips, setActiveShips] = useState(undefined);
  const [destroyedShips, setDestroyedShips] = useState(undefined);
  const [events, setEvents] = useState(undefined);
  const allowUpdate = useAllowUpdate();

  const setData = (data: FleetShipInterface) => {
    setActiveShips(data.activeShips);
    setDestroyedShips(data.destroyedShips);
    setEvents(data.events);
  };

  const refresh = async () => {
    const data = await ApiClient.fetch("/play");
    if (allowUpdate) {
      setData(data);
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
        setData,
        refresh
      }
    },
    children
  );
};


export const useFleetContext = (): FleetContextInterface => {
  return useContext(FleetContext);
};
