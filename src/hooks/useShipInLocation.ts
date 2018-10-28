import { useContext, useEffect } from "react";
import { ShipParamsInterface } from "../Pages/Play";
import { CurrentShipContext } from "../context/CurrentShipContext";
import {ApiClient} from "../util/ApiClient";

// todo - move to CurrentShipContext ?
export function useShipInLocation(match: ShipParamsInterface["match"]) {
  const {port, channel, ship, updateFullResponse, loadingNewShip } = useContext(CurrentShipContext);

  async function getShipData(shipId: string) {
    loadingNewShip();
    const data = await ApiClient.fetch(`/play/${shipId}`);
    updateFullResponse(data);
  }

  useEffect(() => {
    getShipData(match.params.shipId);
  }, [match.params.shipId]);

  return {port, channel, ship};
}
