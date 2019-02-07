import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { useApi } from "../../hooks/useAPI";
import {
  IActionToken,
  IChildrenProps,
  IEffectUpgrade,
  IMessage,
  IShipUpgrade,
} from "../../Interfaces";
import { ApiClient } from "../../util/ApiClient";
import { useSessionContext } from "../SessionContext";

interface IUpgradesContext {
  buttonsDisabled: boolean;
  ships?: IShipUpgrade[];
  effects?: IEffectUpgrade[];
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
  const [effects, setEffects] = useState(undefined);
  const { data } = useApi("/play/inventory");

  const setDataFromResponse = (data: any) => {
    setShips(data.ships);
    setEffects(data.effects);
  };

  const makePurchase = async (token: IActionToken) => {
    setButtonsDisabled(true);

    // make the API call
    const actionData = await ApiClient.tokenFetch(token);
    setDataFromResponse(actionData.upgrades);
    setMessage(actionData.message);

    // update the score
    updateScore(actionData.newScore);
    setButtonsDisabled(false);
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
        effects,
      },
    },
    children
  );
};

export const useUpgradesContext = (): IUpgradesContext => {
  return useContext(UpgradesContext) as IUpgradesContext;
};
