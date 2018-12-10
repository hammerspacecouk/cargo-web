import * as React from "react";
import Modal from "../../../components/Panel/Modal";
import { usePlayPortContext } from "../../../context/Page/PlayPortContext";
import {Button, TYPE_ACTION } from "../../../components/Atoms/Button/Button";
import ButtonRow from "../../../components/Molecules/ButtonRow/ButtonRow";

export default () => {
  const { confirmMoveButton, modalIsOpen, closeModal } = usePlayPortContext();
  return (
    <Modal isOpen={modalIsOpen} onClose={closeModal} title="Are you sure?">
      <p>
        You have not picked up any crates. Are you sure you want to take off?
      </p>
      <div className="modal__action">
        <ButtonRow>
          {confirmMoveButton}
          <Button
            type={TYPE_ACTION}
            className="button button--soft-danger"
            onClick={closeModal}
          >
            Cancel
          </Button>
        </ButtonRow>
      </div>
    </Modal>
  );
};
