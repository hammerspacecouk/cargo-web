import {
  IActionToken,
  IChannel,
  IConvoyOption,
  ICrateAction,
  IDirections,
  IEffect,
  IEffectPurchase,
  IEvent,
  IFleetShip,
  IHealthIncrease,
  ILockedTransaction,
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
import { IAuthProvider } from "../../data/profile";

export enum ACTIVE_VIEW {
  CARGO,
  NAVIGATION,
  TACTICAL,
  SHIPS,
  ENGINEERING,
  LOG,
}

export interface IActiveShip extends IActiveShipState {
  buttonsDisabled?: boolean;
  activeView?: ACTIVE_VIEW;
  setRequestNameToken: (token: ITransaction) => void;
  departureHandler: (token: IActionToken) => Promise<void>;
  portActionHandler: (token: IActionToken) => Promise<any>;
  updateShipName: (name: string, newFleet: IFleetShip[]) => void;
  applyHealthHandler: (token: IActionToken) => Promise<void>;
  resetMessage: () => void;
  refreshState: () => Promise<IActiveShipResponse>;
  setActiveView: (newView?: ACTIVE_VIEW) => void;
}

interface IActiveShipState {
  bonusEffects?: IEffect[];
  cratesInPort?: ICrateAction[];
  cratesOnShip?: ICrateAction[];
  tacticalOptions?: ITacticalOption[];
  convoys?: IConvoyOption[];
  leaveConvoy?: IActionToken;
  effectsToPurchase?: (IEffectPurchase | ILockedTransaction)[];
  directions?: IDirections;
  events?: IEvent[];
  healthOptions?: IHealthIncrease[];
  requestNameToken?: ITransaction;
  ship?: IShip;
  message?: string;
  shipsInLocation?: IOtherShip[];
  channel?: IChannel;
  port?: IPort;
  hint?: string;
  authProviders?: IAuthProvider[];
  tutorialStep?: number;
  sellToken?: ITransaction;
}

export const useActiveShip = (shipId: string, initialShip: IActiveShipResponse): IActiveShip => {
  const { refreshSession, updateScore, updateFleet } = useGameSessionContext();
  const [activeShipState, setActiveShipState] = useState({} as IActiveShipState);
  const [activeView, setActiveViewValue] = useState(null);
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

  const setActiveView = (view?: ACTIVE_VIEW) => {
    if (activeView === view) {
      setActiveViewValue(null);
    } else {
      setActiveViewValue(view);
    }
  };

  const doPortAction = async (token: IActionToken): Promise<any> => {
    const response = await ApiClient.tokenFetch(token);
    updateScore(response.data.playerScore);
    setDataFromResponse(response.data);
    enableButtons();
    if (response.error) {
      setMessage(response.error);
    }
    return response;
  };

  const portActionHandler = (token: IActionToken): Promise<any> => {
    disableButtons();
    return doPortAction(token);
  };

  const departureHandler = async (token: IActionToken): Promise<void> => {
    await portActionHandler(token);
    setActiveView(null);
    if (window) {
      window.scroll(0, 0);
    }
    refreshSession();
  };

  const applyHealthHandler = async (token: IActionToken) => {
    disableButtons();
    const { fleet } = await doPortAction(token);
    updateFleet(fleet.ships);
  };

  const updateShipName = (name: string, newFleet: IFleetShip[]) => {
    if (isMounted()) {
      setActiveShipState(setPropIfChanged(activeShipState, "ship", { ...activeShipState.ship, name }));
    }
    updateFleet(newFleet);
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
    activeView,
    buttonsDisabled,
    departureHandler,
    portActionHandler,
    updateShipName,
    applyHealthHandler,
    setActiveView,
    setRequestNameToken: (token: ITransaction) =>
      isMounted() && setActiveShipState((prev: IActiveShipState) => setPropIfChanged(prev, "requestNameToken", token)),
    message,
    resetMessage: () => setMessage(null),
    refreshState,
  };
};

const getNewActiveShipState = (state: IActiveShipState, activeShip: IActiveShipResponse): IActiveShipState => {
  let newState = state;
  if (!activeShip) {
    newState = setPropIfChanged(newState, "ship", null);
    return newState;
  }
  newState = setPropIfChanged(newState, "ship", activeShip.ship);
  newState = setPropIfChanged(newState, "directions", activeShip.directions);
  newState = setPropIfChanged(newState, "tacticalOptions", activeShip.tacticalOptions);
  newState = setPropIfChanged(newState, "convoys", activeShip.convoys);
  newState = setPropIfChanged(newState, "leaveConvoy", activeShip.leaveConvoy);
  newState = setPropIfChanged(newState, "effectsToPurchase", activeShip.effectsToPurchase);
  newState = setPropIfChanged(newState, "cratesInPort", activeShip.cratesInPort);
  newState = setPropIfChanged(newState, "cratesOnShip", activeShip.cratesOnShip);
  newState = setPropIfChanged(newState, "healthOptions", activeShip.health);
  newState = setPropIfChanged(newState, "healthOptions", activeShip.health);
  newState = setPropIfChanged(newState, "requestNameToken", activeShip.renameToken);
  newState = setPropIfChanged(newState, "shipsInLocation", activeShip.shipsInLocation);
  newState = setPropIfChanged(newState, "port", activeShip.port);
  newState = setPropIfChanged(newState, "channel", activeShip.channel);
  newState = setPropIfChanged(newState, "hint", activeShip.hint);
  newState = setPropIfChanged(newState, "authProviders", activeShip.authProviders);
  newState = setPropIfChanged(newState, "bonusEffects", activeShip.bonus);
  newState = setPropIfChanged(newState, "events", activeShip.events);
  newState = setPropIfChanged(newState, "tutorialStep", activeShip.tutorialStep);
  newState = setPropIfChanged(newState, "sellToken", activeShip.sellToken);
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
