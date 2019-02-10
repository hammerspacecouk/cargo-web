import { createContext, createElement, useContext, useState } from "react";
import { IActionToken, IChildrenProps } from "../../Interfaces";
import { ApiClient } from "../../util/ApiClient";
import { useCurrentShipContext } from "../CurrentShipContext";
import { useSessionContext } from "../SessionContext";
import { useButtonsDisabled } from "../../hooks/useButtonsDisabled";
import { useMounted } from "../../hooks/useMounted";

interface IPlayPortContext {
  buttonsDisabled: boolean;
  confirmMoveButton?: JSX.Element;
  departing: boolean;
  modalIsOpen: boolean;
  openModal: (confirmMoveButton: JSX.Element) => void;
  closeModal: () => void;
  moveCrate: (token: IActionToken) => void;
  moveShip: (token: IActionToken) => void;
  enableButtons: () => void;
  disableButtons: () => void;
}

const PlayPortContext = createContext({});

export const PlayPortContextProvider = ({ children }: IChildrenProps) => {
  const { updateScore } = useSessionContext();
  const { updateFullResponse, setWarningModalText } = useCurrentShipContext();

  const [confirmMoveButton, setConfirmMoveButton] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [departing, setDeparting] = useState(false);
  const {
    buttonsDisabled,
    enableButtons,
    disableButtons,
  } = useButtonsDisabled();
  const mounted = useMounted();

  const doPortAction = async (token: IActionToken) => {
    const { data, error } = await ApiClient.tokenFetch(token);
    if (error) {
      setWarningModalText(error);
    }
    updateScore(data.playerScore);
    updateFullResponse(data);
    if (mounted()) {
      enableButtons();
    }
  };

  const moveCrate = (token: IActionToken): Promise<void> => {
    disableButtons();
    return doPortAction(token);
  };

  const moveShip = async (token: IActionToken) => {
    disableButtons();
    setDeparting(true);
    return doPortAction(token);
  };

  return createElement(
    PlayPortContext.Provider,
    {
      value: {
        buttonsDisabled,
        closeModal: () => {
          setModalIsOpen(false);
          setConfirmMoveButton(null);
        },
        confirmMoveButton,
        departing,
        disableButtons,
        enableButtons,
        modalIsOpen,
        moveCrate,
        moveShip,
        openModal: (confirmMoveButtonElement: JSX.Element) => {
          setConfirmMoveButton(confirmMoveButtonElement);
          setModalIsOpen(true);
        },
      },
    },
    children
  );
};

export const usePlayPortContext = (): IPlayPortContext => {
  return useContext(PlayPortContext) as IPlayPortContext;
};
