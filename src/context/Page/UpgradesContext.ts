import { createContext, createElement, useContext, useState } from "react";
import { useApi } from "../../hooks/useAPI";
import {
  IActionToken,
  IChildrenProps,
  IMessage,
  IShipUpgrade,
} from "../../Interfaces";
import { ApiClient } from "../../util/ApiClient";
import { useSessionContext } from "../SessionContext";

interface IUpgradesContext {
  buttonsDisabled: boolean;
  ships?: IShipUpgrade[];
  message?: IMessage;
  makePurchase: (token: IActionToken) => void;
}

const UpgradesContext = createContext({
  buttonsDisabled: false,
});

export const UpgradesContextProvider = ({ children }: IChildrenProps) => {
  const { updateScore } = useSessionContext();

  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [message, setMessage] = useState(null);
  const [ships, setShips] = useState(undefined);
  const { data } = useApi("/play/upgrades");

  if (!ships && data) {
    setShips(data.ships);
  }

  const makePurchase = async (token: IActionToken) => {
    setButtonsDisabled(true);

    // make the API call
    try {
      const actionData = await ApiClient.tokenFetch(token);
      setShips(actionData.ships);
      setMessage(actionData.message);

      // update the score
      updateScore(actionData.newScore);
    } catch (e) {
      // todo - error handling
    } finally {
      setButtonsDisabled(false);
    }
  };

  return createElement(
    UpgradesContext.Provider,
    {
      value: {
        buttonsDisabled,
        makePurchase,
        message,
        ships,
      },
    },
    children
  );
};

export const useUpgradesContext = (): IUpgradesContext => {
  return useContext(UpgradesContext) as IUpgradesContext;
};
