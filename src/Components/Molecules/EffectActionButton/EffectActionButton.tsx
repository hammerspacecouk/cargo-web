import * as React from "react";
import { IActionToken, IEffect } from "../../../Interfaces";
import styled from "styled-components";
import { ActionButton, Button, ConfirmButton } from "../../Atoms/Button/Button";
import { Modal, ModalActions } from "../Modal/Modal";
import { TokenButton } from "../TokenButton/TokenButton";
import { ApiClient } from "../../../util/ApiClient";
import { useFleetContext } from "../../../context/Page/FleetContext";

interface IProps {
  effect: IEffect;
  token: IActionToken;
  disabled?: boolean;
}

const StyledButton = styled(Button)``;

export const EffectActionButton = ({ effect, token, disabled }: IProps) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const {setFleetData} = useFleetContext();

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const applyAction = async (token: IActionToken) => {
    try {
      const data = await ApiClient.tokenFetch(token);
      setFleetData(data);
      closeModal();
    } catch (e) {
      // todo - error handling
    }
  };

  const modal = (
    <Modal isOpen={modalIsOpen} title={effect.name} onClose={closeModal}>
      {effect.description}
      <ModalActions>
        <TokenButton token={token} handler={applyAction}>
          <ConfirmButton type="submit">Apply</ConfirmButton>
        </TokenButton>
        <ActionButton onClick={closeModal}>Cancel</ActionButton>
      </ModalActions>
    </Modal>
  );

  return (
    <>
      <StyledButton
        disabled={disabled}
        onClick={() => setModalIsOpen(true)}
      >
        {effect.name}
      </StyledButton>
      {modal}
    </>
  );
};
