import * as React from "react";
import Modal, { ModalActions } from "../../../components/Panel/Modal";
import { usePlayPortContext } from "../../../context/Page/PlayPortContext";
import {Button, TYPE_ACTION } from "../../../components/Atoms/Button/Button";
import ButtonRow from "../../../components/Molecules/ButtonRow/ButtonRow";
import { P } from "../../../components/Atoms/Text/Text";

export default () => {
  const { confirmMoveButton, modalIsOpen, closeModal } = usePlayPortContext();
  return (
    <Modal isOpen={modalIsOpen} onClose={closeModal} title="Are you sure?">
      <P>
        You have not picked up any crates. Are you sure you want to leave?
      </P>
      <ModalActions>
        <ButtonRow>
          {confirmMoveButton}
          <Button
            type={TYPE_ACTION}
            onClick={closeModal}
          >
            Cancel
          </Button>
        </ButtonRow>
      </ModalActions>
    </Modal>
  );
};
