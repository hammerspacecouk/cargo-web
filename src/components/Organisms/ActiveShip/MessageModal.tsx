import * as React from "react";
import { Modal, ModalType } from "@src/components/Molecules/Modal";
import { P } from "@src/components/Atoms/Text";
import { Button } from "@src/components/Atoms/Button";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import { ButtonRow } from "@src/components/Molecules/ButtonRow";

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
