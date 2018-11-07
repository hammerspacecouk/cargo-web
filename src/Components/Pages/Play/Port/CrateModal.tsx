import * as React from "react";
import Modal from "../../../Panel/Modal";
import { usePlayPortContext } from "../../../../context/Page/PlayPortContext";

export default () => {
  const { confirmMoveButton, modalIsOpen, closeModal } = usePlayPortContext();
  return (
    <Modal isOpen={modalIsOpen} onClose={closeModal} title="Are you sure?">
      <p>
        You have not picked up any crates. Are you sure you want to take off?
      </p>
      <div className="modal__action">
        {confirmMoveButton}
        <button
          className="button button--soft-danger"
          onClick={this.closeModal}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};
