import { createContext, createElement, useContext, useEffect, useState } from "react";
import { useApi } from "../../hooks/useAPI";
import {
  IActionToken,
  IChildrenProps, IEffectUpgrade,
  IMessage,
  IShipUpgrade
} from "../../Interfaces";
import { ApiClient } from "../../util/ApiClient";
import { useSessionContext } from "../SessionContext";

interface IUpgradesContext {
  buttonsDisabled: boolean;
  ships?: IShipUpgrade[];
  weapons?: IEffectUpgrade[];
  defence?: IEffectUpgrade[];
  navigation?: IEffectUpgrade[];
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
  const [weapons, setWeapons] = useState(undefined);
  const [defence, setDefence] = useState(undefined);
  const [navigation, setNavigation] = useState(undefined);
  const { data } = useApi("/play/upgrades");

  const setDataFromResponse = (data) => {
    setShips(data.ships);
    setWeapons(data.weapons);
    setDefence(data.defence);
    setNavigation(data.navigation);
  };

  const makePurchase = async (token: IActionToken) => {
    setButtonsDisabled(true);

    // make the API call
    try {
      const actionData = await ApiClient.tokenFetch(token);
      setDataFromResponse(actionData.upgrades);
      setMessage(actionData.message);

      // update the score
      updateScore(actionData.newScore);
    } catch (e) {
      // todo - error handling
    } finally {
      setButtonsDisabled(false);
    }
  };

  if (!ships && data) {
    setDataFromResponse(data);
  }

  return createElement(
    UpgradesContext.Provider,
    {
      value: {
        buttonsDisabled,
        makePurchase,
        message,
        ships,
        weapons,
        defence,
        navigation
      },
    },
    children
  );
};

export const useUpgradesContext = (): IUpgradesContext => {
  return useContext(UpgradesContext) as IUpgradesContext;
};
