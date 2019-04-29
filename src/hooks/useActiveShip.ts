import { ICrateAction, IDirections, IShip } from "../Interfaces";
import { useEffect, useState } from "react";
import { useMounted } from "./useMounted";
import { ApiClient } from "../util/ApiClient";

export interface IActiveShip {
  cratesInPort?: ICrateAction[];
  cratesOnShip?: ICrateAction[];
  directions?: IDirections;
  ship?: IShip;
}

export const useActiveShip = (ship: IShip): IActiveShip => {
  const [directions, setDirections] = useState(undefined);
  const [cratesInPort, setCratesInPort] = useState(undefined);
  const [cratesOnShip, setCratesOnShip] = useState(undefined);
  const isMounted = useMounted();

  const setDataFromResponse = (data) => {
    if (!data) {
      // setLoaded(true);
      // setShip(undefined);
      // setPort(undefined);
      // setHint(undefined);
      // setChannel(undefined);
      setDirections(undefined);
      // setShipsInLocation(undefined);
      // setEvents(undefined);
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
    // setEvents(data.events);
    setCratesInPort(data.cratesInPort);
    setCratesOnShip(data.cratesOnShip);
    // setBonusEffects(data.bonus);
    // setTravelEffects(data.travelOptions);
  };

  const setShipData = async () => {
    const data = await ApiClient.fetch(`/play/${ship.id}`);
    if (isMounted()) {
      setDataFromResponse(data);
    }
  };

  useEffect(() => {
    setDataFromResponse(null);
    if (ship) {
      setShipData();
    }
  }, [ship]);


  return {
    cratesInPort,
    cratesOnShip,
    directions,
    ship
  };
};
