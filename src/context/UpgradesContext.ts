import { createContext, createElement, useContext, useState } from "react";
import { ChildrenPropsInterface } from "../interfaces/PropsInterface";

interface UpgradesContextInterface {
  buttonsDisabled: boolean;
  enableButtons: () => void;
  disableButtons: () => void;
}

const UpgradesContext = createContext({
  buttonsDisabled: false
});

export const UpgradesContextComponent = ({ children }: ChildrenPropsInterface) => {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  return createElement(
    UpgradesContext.Provider,
    {
      value: {
        buttonsDisabled,
        enableButtons: () => setButtonsDisabled(true),
        disableButtons: () => setButtonsDisabled(false),
      }
    },
    children
  );
};

export function useUpgradesContext(): UpgradesContextInterface {
  return useContext(UpgradesContext);
}
