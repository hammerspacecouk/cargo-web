import { createContext, createElement, useContext, useState } from "react";
import { ChildrenPropsInterface } from "../../interfaces/PropsInterface";
import { useApi } from "../../hooks/useAPI";
import MessageInterface from "../../interfaces/MessageInterface";
import ActionTokenInterface from "../../interfaces/ActionTokenInterface";
import { useSessionContext } from "../SessionContext";
import { ApiClient } from "../../util/ApiClient";
import { ShipUpgradeInterface } from "../../interfaces/TransactionInterface";

interface UpgradesContextInterface {
  buttonsDisabled: boolean;
  ships?: ShipUpgradeInterface[];
  message?: MessageInterface;
  makePurchase: (token: ActionTokenInterface) => void;
}

const UpgradesContext = createContext({
  buttonsDisabled: false
});

export const UpgradesContextProvider = ({
  children
}: ChildrenPropsInterface) => {
  const { updateScore } = useSessionContext();

  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [message, setMessage] = useState(null);
  const [ships, setShips] = useState(undefined);
  const { data } = useApi("/play/upgrades");

  if (!ships && data) {
    setShips(data.ships);
  }

  const makePurchase = async (token: ActionTokenInterface) => {
    setButtonsDisabled(true);

    //make the API call
    try {
      const data = await ApiClient.fetch(token.path, { token: token.token });
      setShips(data.ships);
      setMessage(data.message);

      // update the score
      updateScore(data.newScore);
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
        ships,
        message,
        makePurchase,
      }
    },
    children
  );
};

export function useUpgradesContext(): UpgradesContextInterface {
  return useContext(UpgradesContext);
}
