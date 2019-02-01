import { createContext, createElement, useContext, useState } from "react";
import { useMounted } from "../../hooks/useMounted";
import { IChildrenProps, IEvent, IFleetShip } from "../../Interfaces";
import { ApiClient } from "../../util/ApiClient";
import { useSessionContext } from "../SessionContext";
import { useButtonsDisabled } from "../../hooks/useButtonsDisabled";

export interface IFleetResponse {
  ships: IFleetShip[];
  events: IEvent[];
}

interface IFleetContext {
  ships: IFleetShip[];
  events: IEvent[];
  setFleetData: (data: IFleetResponse) => void;
  refresh: () => void;
  buttonsDisabled: boolean;
  enableButtons: () => void;
  disableButtons: () => void;
}

const FleetContext = createContext({});

export const FleetContextProvider = ({ children }: IChildrenProps) => {
  const { setSession } = useSessionContext();
  const [ships, setShips] = useState(undefined);
  const [events, setEvents] = useState(undefined);
  const {buttonsDisabled, enableButtons, disableButtons} = useButtonsDisabled();
  const isMounted = useMounted();

  const setFleetData = (data: IFleetResponse) => {
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
        buttonsDisabled,
        disableButtons,
        enableButtons,
        events,
        refresh,
        setFleetData,
        ships,
      },
    },
    children
  );
};

export const useFleetContext = (): IFleetContext => {
  return useContext(FleetContext) as IFleetContext;
};
