import * as React from "react";
import { IActionToken, IEffect } from "../../interfaces";
import { ActionButton, ConfirmButton, DisguisedButton } from "../Atoms/Button";
import { Modal, ModalActions } from "./Modal";
import { TokenButton } from "./TokenButton";
import { Loading } from "../Atoms/Loading";
import { useMounted } from "../../hooks/useMounted";
import { Effect } from "./Effect";
import styled from "styled-components";

interface IProps {
  readonly effect: IEffect;
  readonly token: IActionToken;
  readonly disabled?: boolean;
  readonly handler?: (token: IActionToken) => Promise<void> | null | void;
}

const Button = styled(DisguisedButton)`
  &:active {
    transform: scale(0.96);
  }
`;

export const EffectActionButton = React.memo(({ disabled, effect, handler, token }: IProps) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [isActioning, setIsActioning] = React.useState(false);

  const isMounted = useMounted();

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // todo - use the <UseEffectItem />

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
      <Button disabled={disabled} onClick={() => setModalIsOpen(true)}>
        <Effect disabled={disabled} isButton={true} effect={effect} />
      </Button>
      {modal}
    </>
  );
});
