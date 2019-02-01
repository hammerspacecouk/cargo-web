import { useState } from "react";

export const useButtonsDisabled = () => {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const disableButtons = () => {
    setButtonsDisabled(true);
  };

  const enableButtons = () => {
    setButtonsDisabled(false);
  };

  return { buttonsDisabled, disableButtons, enableButtons };
};
