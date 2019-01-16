import { createContext, createElement, useContext, useState } from "react";
import { IActionToken, IChildrenProps } from "../../Interfaces";
import { ApiClient } from "../../util/ApiClient";
import { useCurrentShipContext } from "../CurrentShipContext";
import { useSessionContext } from "../SessionContext";
import * as React from "react";

interface IPlayPortContext {
  buttonsDisabled: boolean;
  confirmMoveButton?: JSX.Element;
  departing: boolean;
  modalIsOpen: boolean;
  openModal: (confirmMoveButton: JSX.Element) => void;
  closeModal: () => void;
  moveCrate: (token: IActionToken) => void;
  moveShip: (token: IActionToken) => void;
}

const PlayPortContext = createContext({});

export const PlayPortContextProvider = ({ children }: IChildrenProps) => {
  const { updateScore } = useSessionContext();
  const { updateFullResponse } = useCurrentShipContext();

  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [confirmMoveButton, setConfirmMoveButton] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [departing, setDeparting] = useState(false);
  const mounted = React.useRef(false);

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  });

  const doPortAction = async (token: IActionToken) => {
    try {
      const data = await ApiClient.tokenFetch(token);
      updateScore(data.playerScore);
      updateFullResponse(data);
    } catch (e) {
      // todo - error handling
    } finally {
      if (mounted.current) {
        setButtonsDisabled(false);
      }
    }
  };

  const moveCrate = (token: IActionToken): Promise<void> => {
    setButtonsDisabled(true);
    return doPortAction(token);
  };

  const moveShip = async (token: IActionToken) => {
    setButtonsDisabled(true);
    setDeparting(true);

    try {
      const data = await ApiClient.tokenFetch(token);
      updateScore(data.shipResponse.playerScore);
      updateFullResponse(data.shipResponse);

      console.log(data.earnedEffects); // todo - send into useCurrentShipContext
    } catch (e) {
      // todo - error handling
    } finally {
      if (mounted.current) {
        setButtonsDisabled(false);
      }
    }
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
