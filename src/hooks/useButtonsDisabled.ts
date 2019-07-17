import { useState } from "react";
import { useMounted } from "./useMounted";

export const useButtonsDisabled = () => {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const isMounted = useMounted();

  const disableButtons = () => {
    if (isMounted()) {
      setButtonsDisabled(true);
    }
  };

  const enableButtons = () => {
    if (isMounted()) {
      setButtonsDisabled(false);
    }
  };

  return { buttonsDisabled, disableButtons, enableButtons };
};
