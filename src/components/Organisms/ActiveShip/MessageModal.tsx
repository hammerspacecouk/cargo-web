import * as React from "react";
import { Modal, ModalActions, ModalType } from "../../Molecules/Modal";
import { P } from "../../Atoms/Text";
import { Button } from "../../Atoms/Button";
import { useActiveShipContext } from "../../../contexts/ActiveShipContext/ActiveShipContext";

export const MessageModal = () => {
  const { message, resetMessage } = useActiveShipContext();

  if (!message) {
    return null;
  }

  return (
    <Modal isOpen={true} onClose={resetMessage} title="Incoming..." type={ModalType.WARNING}>
      <P>{message}</P>
      <ModalActions>
        <Button onClick={resetMessage}>Understood</Button>
      </ModalActions>
    </Modal>
  );
};
