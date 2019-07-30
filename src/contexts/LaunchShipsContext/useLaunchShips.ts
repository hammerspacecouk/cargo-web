import { IActionToken, IShipUpgrade } from "../../interfaces";
import { useState } from "react";
import { ApiClient } from "../../utils/ApiClient";
import { useButtonsDisabled } from "../../hooks/useButtonsDisabled";
import { useGameSessionContext } from "../GameSessionContext/GameSessionContext";
import { useMounted } from "../../hooks/useMounted";
import { IGameSessionResponse } from "../../data/game";
import { ILaunchEvent, ILaunchShipsResponse } from "../../data/launch-ships";

export interface ILaunchShips {
  ships: IShipUpgrade[];
  buttonsDisabled?: boolean;
  launchEvent?: ILaunchEvent;
  purchaseHandler: (token: IActionToken) => Promise<void>;
  acknowledgeLaunchEvent: () => void;
}

export const useLaunchShips = (initialShips: IShipUpgrade[]): ILaunchShips => {
  const { setSession } = useGameSessionContext();
  const [launchEvent, setLaunchEvent] = useState(null);
  const [ships, setShips] = useState(initialShips);
  const { disableButtons, enableButtons, buttonsDisabled } = useButtonsDisabled();
  const isMounted = useMounted();

  const purchaseHandler = async (token: IActionToken) => {
    disableButtons();
    const res: IPurchaseResponse = await ApiClient.tokenFetch(token);
    if (isMounted()) {
      setShips(res.shipsAvailable.ships);
      setSession(res.session);
      setLaunchEvent(res.launch);
      enableButtons();
    }
  };

  return {
    ships,
    buttonsDisabled,
    launchEvent,
    acknowledgeLaunchEvent: () => setLaunchEvent(null),
    purchaseHandler,
  };
};

interface IPurchaseResponse {
  launch: ILaunchEvent;
  session: IGameSessionResponse;
  shipsAvailable: ILaunchShipsResponse
}
