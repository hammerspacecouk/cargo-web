import {
  IActionToken,
  IChannel,
  ICrateAction,
  IDirections,
  IEffect,
  IEffectUpgrade,
  IEvent,
  IHealthIncrease,
  IOtherShip,
  IPort,
  IShip,
  ITacticalOption,
  ITransaction,
} from "../../interfaces";
import { useEffect, useState } from "react";
import { ApiClient } from "../../utils/ApiClient";
import { useButtonsDisabled } from "../../hooks/useButtonsDisabled";
import { useGameSessionContext } from "../GameSessionContext/GameSessionContext";
import { getShipData, IActiveShipResponse } from "../../data/active-ship";
import { useMounted } from "../../hooks/useMounted";

export interface IActiveShip extends IActiveShipState {
  buttonsDisabled?: boolean;
  setRequestNameToken: (token: ITransaction) => void;
  portActionHandler: (token: IActionToken) => Promise<void>;
  updateShipName: (newName: string) => void;
  applyHealthHandler: (token: IActionToken) => Promise<void>;
  resetMessage: () => void;
  refreshState: () => Promise<IActiveShipResponse>;
}

interface IActiveShipState {
  bonusEffects?: IEffect[];
  cratesInPort?: ICrateAction[];
  cratesOnShip?: ICrateAction[];
  tacticalOptions?: ITacticalOption[];
  directions?: IDirections;
  events?: IEvent[];
  healthOptions?: IHealthIncrease[];
  requestNameToken?: ITransaction;
  ship?: IShip;
  message?: string;
  shipsInLocation?: IOtherShip[];
  purchaseOptions?: IEffectUpgrade[];
  channel?: IChannel;
  port?: IPort;
  hint?: string;
}

export const useActiveShip = (shipId: string, initialShip: IActiveShipResponse): IActiveShip => {
  const { updateScore, updateAShipProperty } = useGameSessionContext();
  const [activeShipState, setActiveShipState] = useState({} as IActiveShipState);
  const [message, setMessage] = useState(null);
  const { disableButtons, enableButtons, buttonsDisabled } = useButtonsDisabled();
  const isMounted = useMounted();

  useEffect(() => {
    setActiveShipState(getNewActiveShipState(activeShipState, initialShip));
  }, [initialShip]);

  const setDataFromResponse = (data?: IActiveShipResponse) => {
    if (!isMounted()) {
      return;
    }
    setActiveShipState(getNewActiveShipState(activeShipState, data));
  };

  const doPortAction = async (token: IActionToken) => {
    const { data, error } = await ApiClient.tokenFetch(token);
    updateScore(data.playerScore);
    setDataFromResponse(data);
    enableButtons();
    if (error) {
      setMessage(error);
    }
    return data;
  };

  const portActionHandler = (token: IActionToken): Promise<void> => {
    disableButtons();
    return doPortAction(token);
  };

  const applyHealthHandler = async (token: IActionToken) => {
    disableButtons();
    const data = await doPortAction(token);
    updateAShipProperty(activeShipState.ship.id, {
      strengthPercent: data.ship.strengthPercent,
    });
  };

  const updateShipName = (name: string) => {
    if (isMounted()) {
      setActiveShipState(setPropIfChanged(activeShipState, "ship", { ...activeShipState.ship, name }));
    }
    updateAShipProperty(activeShipState.ship.id, { name });
  };

  const refreshState = async (): Promise<IActiveShipResponse> => {
    if (activeShipState.ship) {
      const data = await getShipData(activeShipState.ship.id);
      setDataFromResponse(data);
      return data;
    }
  };

  return {
    ...activeShipState,
    buttonsDisabled,
    portActionHandler,
    updateShipName,
    applyHealthHandler,
    setRequestNameToken: (token: ITransaction) =>
      isMounted() && setActiveShipState((prev: IActiveShipState) => setPropIfChanged(prev, "requestNameToken", token)),
    message,
    resetMessage: () => setMessage(null),
    refreshState,
  };
};

const getNewActiveShipState = (state: IActiveShipState, activeShip: IActiveShipResponse): IActiveShipState => {
  let newState = state;
  newState = setPropIfChanged(newState, "ship", activeShip.ship);
  newState = setPropIfChanged(newState, "directions", activeShip.directions);
  newState = setPropIfChanged(newState, "tacticalOptions", activeShip.tacticalOptions);
  newState = setPropIfChanged(newState, "cratesInPort", activeShip.cratesInPort);
  newState = setPropIfChanged(newState, "cratesOnShip", activeShip.cratesOnShip);
  newState = setPropIfChanged(newState, "healthOptions", activeShip.health);
  newState = setPropIfChanged(newState, "healthOptions", activeShip.health);
  newState = setPropIfChanged(newState, "requestNameToken", activeShip.renameToken);
  newState = setPropIfChanged(newState, "shipsInLocation", activeShip.shipsInLocation);
  newState = setPropIfChanged(newState, "purchaseOptions", activeShip.purchaseOptions);
  newState = setPropIfChanged(newState, "port", activeShip.port);
  newState = setPropIfChanged(newState, "channel", activeShip.channel);
  newState = setPropIfChanged(newState, "hint", activeShip.hint);
  newState = setPropIfChanged(newState, "bonusEffects", activeShip.bonus);
  newState = setPropIfChanged(newState, "events", activeShip.events);
  return newState;
};

const setPropIfChanged = (state: IActiveShipState, prop: keyof IActiveShipState, newValue: any): IActiveShipState => {
  if (JSON.stringify(state[prop]) === JSON.stringify(newValue)) {
    return state;
  }
  return {
    ...state,
    [prop]: newValue,
  };
};
