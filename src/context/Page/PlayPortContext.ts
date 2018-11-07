import { createElement, createContext, useContext, useState } from "react";
import { ChildrenPropsInterface } from "../../interfaces/PropsInterface";
import ActionTokenInterface from "../../interfaces/ActionTokenInterface";
import { useSessionContext } from "../SessionContext";
import { useCurrentShipContext } from "../CurrentShipContext";
import { ApiClient } from "../../util/ApiClient";

interface PlayPortContextInterface {
  buttonsDisabled: boolean;
  confirmMoveButton?: JSX.Element;
  departing: boolean;
  modalIsOpen: boolean;
  openModal: (confirmMoveButton: JSX.Element) => void;
  closeModal: () => void;
  moveCrate: (token: ActionTokenInterface) => void;
  moveShip: (token: ActionTokenInterface) => void;
}

const PlayPortContext = createContext({});

export const PlayPortContextProvider = ({
  children
}: ChildrenPropsInterface) => {
  const { updateScore } = useSessionContext();
  const { updateFullResponse } = useCurrentShipContext();

  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [confirmMoveButton, setConfirmMoveButton] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [departing, setDeparting] = useState(false);

  const doPortAction = async (token: ActionTokenInterface) => {
    try {
      const data = await ApiClient.fetch(token.path, { token: token.token });
      updateScore(data.playerScore);
      updateFullResponse(data);
    } catch (e) {
      // todo - error handling
    } finally {
      setButtonsDisabled(false);
    }
  };

  const moveCrate = (token: ActionTokenInterface) => {
    setButtonsDisabled(true);
    return doPortAction(token);
  };

  const moveShip = (token: ActionTokenInterface) => {
    setButtonsDisabled(true);
    setDeparting(true);
    return doPortAction(token);
  };

  return createElement(
    PlayPortContext.Provider,
    {
      value: {
        buttonsDisabled,
        confirmMoveButton,
        departing,
        modalIsOpen,
        moveCrate,
        moveShip,
        openModal: (confirmMoveButton: JSX.Element) => {
          setConfirmMoveButton(confirmMoveButton);
          setModalIsOpen(true);
        },
        closeModal: () => {
          setModalIsOpen(false);
          setConfirmMoveButton(null);
        }
      }
    },
    children
  );
};

export const usePlayPortContext = (): PlayPortContextInterface => {
  return useContext(PlayPortContext);
};
