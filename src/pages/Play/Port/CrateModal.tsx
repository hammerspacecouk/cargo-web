import * as React from "react";
import { ActionButton } from "../../../components/Atoms/Button/Button";
import { P } from "../../../components/Atoms/Text/Text";
import { ButtonRow } from "../../../components/Molecules/ButtonRow/ButtonRow";
import { Modal, ModalActions } from "../../../components/Molecules/Modal/Modal";
import { usePlayPortContext } from "../../../context/Page/PlayPortContext";

export default () => {
  const { confirmMoveButton, modalIsOpen, closeModal } = usePlayPortContext();
  return (
    <Modal isOpen={modalIsOpen} onClose={closeModal} title="Are you sure?">
      <P>You have not picked up any crates. Are you sure you want to leave?</P>
      <ModalActions>
        <ButtonRow>
          {confirmMoveButton}
          <ActionButton onClick={closeModal}>Cancel</ActionButton>
        </ButtonRow>
      </ModalActions>
    </Modal>
  );
};
