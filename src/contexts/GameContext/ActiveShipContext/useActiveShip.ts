import { IActionToken, ICrateAction, IDirections, IEvent, IShip } from "../../../Interfaces";
import { useEffect, useState } from "react";
import { useMounted } from "../../../hooks/useMounted";
import { ApiClient } from "../../../util/ApiClient";
import { useButtonsDisabled } from "../../../hooks/useButtonsDisabled";
import { useGameContext } from "../GameContext";

export interface IActiveShip {
  buttonsDisabled: boolean;
  cratesInPort?: ICrateAction[];
  cratesOnShip?: ICrateAction[];
  directions?: IDirections;
  events?: IEvent[];
  ship?: IShip;
  moveCrateHandler: (token: IActionToken) => Promise<void>;
}

export const useActiveShip = (ship: IShip): IActiveShip => {
  const {updateScore} = useGameContext();
  const [directions, setDirections] = useState(undefined);
  const [cratesInPort, setCratesInPort] = useState(undefined);
  const [cratesOnShip, setCratesOnShip] = useState(undefined);
  const [events, setEvents] = useState(undefined);
  const isMounted = useMounted();
  const {disableButtons, enableButtons, buttonsDisabled} = useButtonsDisabled();

  const setDataFromResponse = (data) => {
    if (!isMounted()) {
      return;
    }
    if (!data) {
      // setLoaded(true);
      // setShip(undefined);
      // setPort(undefined);
      // setHint(undefined);
      // setChannel(undefined);
      setDirections(undefined);
      // setShipsInLocation(undefined);
      setEvents(undefined);
      setCratesInPort(undefined);
      setCratesOnShip(undefined);
      // setBonusEffects(undefined);
      // setTravelEffects(undefined);
      return;
    }

    // setLoaded(true);
    // setShip(data.ship);
    // setPort(data.port);
    // setChannel(data.channel);
    // setHint(data.hint);
    setDirections(data.directions);
    // setShipsInLocation(data.shipsInLocation);
    setEvents(data.events);
    setCratesInPort(data.cratesInPort);
    setCratesOnShip(data.cratesOnShip);
    // setBonusEffects(data.bonus);
    // setTravelEffects(data.travelOptions);
  };

  const setShipData = async () => {
    const data = await ApiClient.fetch(`/play/${ship.id}`);
    setDataFromResponse(data);
  };

  const doPortAction = async (token: IActionToken) => {
    const { data } = await ApiClient.tokenFetch(token);
    updateScore(data.playerScore);
    setDataFromResponse(data);
    enableButtons();
  };

  const moveCrateHandler = (token: IActionToken): Promise<void> => {
    disableButtons();
    return doPortAction(token);
  };

  useEffect(() => {
    setDataFromResponse(null);
    if (ship) {
      setShipData();
    }
  }, [ship]);


  return {
    buttonsDisabled,
    cratesInPort,
    cratesOnShip,
    directions,
    events,
    ship,
    moveCrateHandler
  };
};
