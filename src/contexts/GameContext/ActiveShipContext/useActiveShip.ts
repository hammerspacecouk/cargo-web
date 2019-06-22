import {
  IActionToken,
  ICrateAction,
  ITacticalOption,
  IDirections,
  IEvent,
  IHealthIncrease,
  IOtherShip,
  IShip,
  ITransaction,
  IEffectUpgrade,
  IPort,
  IChannel,
  IEffect,
} from "../../../Interfaces";
import { useEffect, useState } from "react";
import { useMounted } from "../../../hooks/useMounted";
import { ApiClient } from "../../../util/ApiClient";
import { useButtonsDisabled } from "../../../hooks/useButtonsDisabled";
import { useGameContext } from "../GameContext";

export interface IActiveShip {
  bonusEffects?: IEffect[];
  buttonsDisabled: boolean;
  cratesInPort?: ICrateAction[];
  cratesOnShip?: ICrateAction[];
  tacticalOptions?: ITacticalOption[];
  directions?: IDirections;
  events?: IEvent[];
  healthOptions: IHealthIncrease[];
  setRequestNameToken: (token: ITransaction) => void;
  requestNameToken: ITransaction;
  ship?: IShip;
  portActionHandler: (token: IActionToken) => Promise<void>;
  updateShipName: (newName: string) => void;
  applyHealthHandler: (token: IActionToken) => Promise<void>;
  message?: string;
  resetMessage: () => void;
  shipsInLocation?: IOtherShip[];
  purchaseOptions: IEffectUpgrade[];
  channel?: IChannel;
  port?: IPort;
  hint?: string;
}

export const useActiveShip = (incomingShip: IShip): IActiveShip => {
  const { updateScore, updateAShipProperty } = useGameContext();
  const [ship, setShip] = useState(incomingShip);
  const [directions, setDirections] = useState(undefined);
  const [tacticalOptions, setTacticalOptions] = useState(undefined);
  const [cratesInPort, setCratesInPort] = useState(undefined);
  const [cratesOnShip, setCratesOnShip] = useState(undefined);
  const [healthOptions, setHealthOptions] = useState(undefined);
  const [requestNameToken, setRequestNameToken] = useState(undefined);
  const [shipsInLocation, setShipsInLocation] = useState(undefined);
  const [purchaseOptions, setPurchaseOptions] = useState(undefined);
  const [port, setPort] = useState(undefined);
  const [channel, setChannel] = useState(undefined);
  const [hint, setHint] = useState(undefined);
  const [bonusEffects, setBonusEffects] = useState(undefined);
  const [events, setEvents] = useState(undefined);
  const [message, setMessage] = useState(null);
  const isMounted = useMounted();
  const { disableButtons, enableButtons, buttonsDisabled } = useButtonsDisabled();

  const setDataFromResponse = (data: any) => {
    if (!isMounted()) {
      return;
    }
    if (!data) {
      setShip(undefined);
      setPort(undefined);
      setHint(undefined);
      setChannel(undefined);
      setDirections(undefined);
      setShipsInLocation(undefined);
      setEvents(undefined);
      setCratesInPort(undefined);
      setCratesOnShip(undefined);
      setTacticalOptions(undefined);
      setBonusEffects(undefined);
      setRequestNameToken(undefined);
      setHealthOptions(undefined);
      setPurchaseOptions(undefined);
      return;
    }

    setPort(data.port);
    setChannel(data.channel);
    setHint(data.hint);
    setDirections(data.directions);
    setShipsInLocation(data.shipsInLocation);
    setEvents(data.events);
    setCratesInPort(data.cratesInPort);
    setCratesOnShip(data.cratesOnShip);
    setTacticalOptions(data.tacticalOptions);
    setBonusEffects(data.bonus && data.bonus.length ? data.bonus : undefined);
    setRequestNameToken(data.renameToken);
    setHealthOptions(data.health);
    setPurchaseOptions(data.purchaseOptions);

    // set the ship last as a change here would trigger a re-render of the whole context
    setShip(data.ship);
  };

  const setShipData = async (id: string) => {
    const data = await ApiClient.fetch(`/play/${id}`);
    setDataFromResponse(data);
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
    updateAShipProperty(ship.id, {
      strengthPercent: data.ship.strengthPercent,
    });
  };

  const updateShipName = (name: string) => {
    if (isMounted()) {
      setShip({ ...ship, name });
    }
    updateAShipProperty(ship.id, { name });
  };

  useEffect(() => {
    setShip(incomingShip);
    setDataFromResponse(null);
    if (incomingShip) {
      setShipData(incomingShip.id);
    }
  }, [incomingShip]);

  return {
    buttonsDisabled,
    cratesInPort,
    cratesOnShip,
    tacticalOptions,
    directions,
    events,
    healthOptions,
    requestNameToken,
    setRequestNameToken,
    ship,
    portActionHandler,
    updateShipName,
    applyHealthHandler,
    message,
    resetMessage: () => setMessage(null),
    shipsInLocation,
    purchaseOptions,
    channel,
    port,
    hint,
    bonusEffects,
  };
};
