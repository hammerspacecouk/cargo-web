import {
  IActionToken,
  ICrateAction,
  IDefenceOption,
  IDirections,
  IEvent,
  IHealthIncrease,
  IOtherShip,
  IShip,
  ITransaction,
} from "../../../Interfaces";
import { useEffect, useState } from "react";
import { useMounted } from "../../../hooks/useMounted";
import { ApiClient } from "../../../util/ApiClient";
import { useButtonsDisabled } from "../../../hooks/useButtonsDisabled";
import { useGameContext } from "../GameContext";

export interface IActiveShip {
  buttonsDisabled: boolean;
  cratesInPort?: ICrateAction[];
  cratesOnShip?: ICrateAction[];
  defenceOptions?: IDefenceOption[];
  directions?: IDirections;
  events?: IEvent[];
  healthOptions: IHealthIncrease[];
  setRequestNameToken: (token: ITransaction) => void;
  requestNameToken: ITransaction;
  ship?: IShip;
  moveCrateHandler: (token: IActionToken) => Promise<void>;
  updateShipName: (newName: string) => void;
  applyHealthHandler: (token: IActionToken) => Promise<void>;
  message?: string;
  resetMessage: () => void;
  shipsInLocation?: IOtherShip[];
}

export const useActiveShip = (incomingShip: IShip): IActiveShip => {
  const { updateScore, updateAShipProperty } = useGameContext();
  const [ship, setShip] = useState(incomingShip);
  const [directions, setDirections] = useState(undefined);
  const [defenceOptions, setDefenceOptions] = useState(undefined);
  const [cratesInPort, setCratesInPort] = useState(undefined);
  const [cratesOnShip, setCratesOnShip] = useState(undefined);
  const [healthOptions, setHealthOptions] = useState(undefined);
  const [requestNameToken, setRequestNameToken] = useState(undefined);
  const [shipsInLocation, setShipsInLocation] = useState(undefined);
  const [events, setEvents] = useState(undefined);
  const [message, setMessage] = useState(null);
  const isMounted = useMounted();
  const {
    disableButtons,
    enableButtons,
    buttonsDisabled,
  } = useButtonsDisabled();

  const setDataFromResponse = (data: any) => {
    if (!isMounted()) {
      return;
    }
    if (!data) {
      // setLoaded(true);
      setShip(undefined);
      // setPort(undefined);
      // setHint(undefined);
      // setChannel(undefined);
      setDirections(undefined);
      setShipsInLocation(undefined);
      setEvents(undefined);
      setCratesInPort(undefined);
      setCratesOnShip(undefined);
      setDefenceOptions(undefined);
      // setBonusEffects(undefined);
      // setTravelEffects(undefined);
      setRequestNameToken(undefined);
      setHealthOptions(undefined);
      return;
    }

    // setLoaded(true);
    setShip(data.ship);
    // setPort(data.port);
    // setChannel(data.channel);
    // setHint(data.hint);
    setDirections(data.directions);
    setShipsInLocation(data.shipsInLocation);
    setEvents(data.events);
    setCratesInPort(data.cratesInPort);
    setCratesOnShip(data.cratesOnShip);
    setDefenceOptions(data.defenceOptions);
    // setBonusEffects(data.bonus);
    // setTravelEffects(data.travelOptions);
    setRequestNameToken(data.renameToken);
    setHealthOptions(data.health);
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

  const moveCrateHandler = (token: IActionToken): Promise<void> => {
    disableButtons();
    return doPortAction(token);
  };

  const applyHealthHandler = async (token: IActionToken) => {
    disableButtons();
    const data = await doPortAction(token);
    updateAShipProperty(ship.id, {
      strengthPercent: data.ship.strengthPercent,
    });

    // todo - should this be there?
    // const data: any = await ApiClient.tokenFetch(token);
    // enableButtons();
    // updateScore(data.newScore);
    // setDataFromResponse(data.activeShip);
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
    defenceOptions,
    directions,
    events,
    healthOptions,
    requestNameToken,
    setRequestNameToken,
    ship,
    moveCrateHandler,
    updateShipName,
    applyHealthHandler,
    message,
    resetMessage: () => setMessage(null),
    shipsInLocation,
  };
};
