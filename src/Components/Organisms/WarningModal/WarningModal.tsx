import * as React from "react";
import { ActionButton, WarningButton } from "../../Atoms/Button/Button";
import { P } from "../../Atoms/Text/Text";
import { ButtonRow } from "../../Molecules/ButtonRow/ButtonRow";
import {
  Modal,
  ModalActions,
  ModalType,
} from "../../Molecules/Modal/Modal";

interface IProps {
  text?: string;
  closeModal: () => void;
}

export const WarningModal = ({text, closeModal}: IProps) => {
  return (
    <Modal
      isOpen={text !== undefined}
      onClose={closeModal}
      title="Notice"
      type={ModalType.WARNING}
    >
      <P>{text}</P>
      <ModalActions>
        <ButtonRow>
          <WarningButton onClick={closeModal}>Understood</WarningButton>
        </ButtonRow>
      </ModalActions>
    </Modal>
  );
};
