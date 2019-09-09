import * as React from "react";
import { Modal, ModalType } from "../../Molecules/Modal";
import { P } from "../../Atoms/Text";
import { Button } from "../../Atoms/Button";
import { useActiveShipContext } from "../../../contexts/ActiveShipContext/ActiveShipContext";
import { ButtonRow } from "../../Molecules/ButtonRow";

export const MessageModal = () => {
  const { message, resetMessage } = useActiveShipContext();

  if (!message) {
    return null;
  }

  return (
    <Modal isOpen={true} onClose={resetMessage} title="Incoming..." type={ModalType.WARNING}>
      <P>{message}</P>
      <ButtonRow>
        <Button onClick={resetMessage}>Understood</Button>
      </ButtonRow>
    </Modal>
  );
};
