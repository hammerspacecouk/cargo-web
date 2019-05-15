import * as React from "react";
import { Modal, ModalActions, ModalType } from "../../../../components/Molecules/Modal/Modal";
import { P } from "../../../../components/Atoms/Text/Text";
import { Button } from "../../../../components/Atoms/Button/Button";
import { useActiveShipContext } from "../ActiveShipContext";

export const MessageModal = () => {
  const { message, resetMessage } = useActiveShipContext();

  if (!message) {
    return null;
  }

  return (
    <Modal
      isOpen={true}
      onClose={resetMessage}
      title="Incoming..."
      type={ModalType.WARNING}
    >
      <P>{message}</P>
      <ModalActions>
        <Button onClick={resetMessage}>Understood</Button>
      </ModalActions>
    </Modal>
  );
};
