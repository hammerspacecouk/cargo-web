import { useEffect, useState } from "react";
import { useSessionContext } from "../context/SessionContext";
import { ApiClient, ErrorResponseInterface } from "../util/ApiClient";
import ShipInterface from "../interfaces/ShipInterface";
import EventInterface from "../interfaces/EventInterface";

// todo - move to a context
interface State {
  error?: ErrorResponseInterface;
  activeShips: ShipInterface[];
  destroyedShips: ShipInterface[];
  events: EventInterface[];
}

export function useFleetState(): State {
  const [fleetState, setFleetState] = useState({
    activeShips: undefined,
    destroyedShips: undefined,
    events: undefined
  });
  const { setSession } = useSessionContext();

  let allowUpdate = false;

  async function initialData() {
    const data = await ApiClient.fetch("/play");
    if (allowUpdate) {
      setFleetState(data);
    }
    setSession(data.sessionState);
  }

  useEffect(() => {
    allowUpdate = true;
    initialData();
    return () => {
      allowUpdate = false;
    };
  }, []);
  return {
    activeShips: fleetState.activeShips,
    destroyedShips: fleetState.destroyedShips,
    events: fleetState.events
  };
}
