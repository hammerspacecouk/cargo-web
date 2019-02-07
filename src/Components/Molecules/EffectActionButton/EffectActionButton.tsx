import * as React from "react";
import { IActionToken, IEffect } from "../../../Interfaces";
import styled from "styled-components";
import { ActionButton, Button, ConfirmButton } from "../../Atoms/Button/Button";
import { Modal, ModalActions } from "../Modal/Modal";
import { TokenButton } from "../TokenButton/TokenButton";
import { Loading } from "../../Atoms/Loading/Loading";
import { useMounted } from "../../../hooks/useMounted";

interface IProps {
  readonly effect: IEffect;
  readonly token: IActionToken;
  readonly disabled?: boolean;
  readonly handler?: (token: IActionToken) => Promise<void> | null | void;
}

const StyledButton = styled(Button)``;

export const EffectActionButton = ({
  disabled,
  effect,
  handler,
  token,
}: IProps) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [isActioning, setIsActioning] = React.useState(false);

  const isMounted = useMounted();

  const closeModal = () => {
    setModalIsOpen(false);
  };

  let modalActions = <Loading />;
  if (!isActioning) {
    modalActions = (
      <>
        <TokenButton
          token={token}
          handler={async token => {
            setIsActioning(true);
            await handler(token);
            if (isMounted()) {
              setIsActioning(false);
              closeModal();
            }
          }}
        >
          <ConfirmButton type="submit">Apply</ConfirmButton>
        </TokenButton>
        <ActionButton onClick={closeModal}>Cancel</ActionButton>
      </>
    );
  }

  const modal = (
    <Modal isOpen={modalIsOpen} title={effect.name} onClose={closeModal}>
      {effect.description}
      <ModalActions>{modalActions}</ModalActions>
    </Modal>
  );

  return (
    <>
      <StyledButton disabled={disabled} onClick={() => setModalIsOpen(true)}>
        {effect.name}
      </StyledButton>
      {modal}
    </>
  );
};
