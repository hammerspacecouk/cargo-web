import { createContext, createElement, useContext, useState } from "react";
import { ChildrenPropsInterface } from "../interfaces/PropsInterface";
import ShipInterface from "../interfaces/ShipInterface";
import { useApi } from "../hooks/useAPI";
import MessageInterface from "../interfaces/MessageInterface";

interface UpgradesContextInterface {
  ships?: ShipInterface[];
  message?: MessageInterface;
  buttonsDisabled: boolean;
  enableButtons: () => void;
  disableButtons: () => void;
  updateShips: (ships: ShipInterface[]) => void;
  updateMessage: (newMessage?: MessageInterface) => void;
}

const UpgradesContext = createContext({
  buttonsDisabled: false
});

export const UpgradesContextComponent = ({ children }: ChildrenPropsInterface) => {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [message, setMessage] = useState(null);
  const [ships, setShips] = useState(undefined);
  const { data } = useApi("/play/upgrades");

  if (!ships && data) {
    setShips(data.ships);
  }

  return createElement(
    UpgradesContext.Provider,
    {
      value: {
        buttonsDisabled,
        ships,
        message,
        enableButtons: () => setButtonsDisabled(true),
        disableButtons: () => setButtonsDisabled(false),
        updateMessage: (newMessage?: MessageInterface) => setMessage(newMessage),
        updateShips: (newShips: ShipInterface[]) => setShips(newShips),
      }
    },
    children
  );
};

export function useUpgradesContext(): UpgradesContextInterface {
  return useContext(UpgradesContext);
}
