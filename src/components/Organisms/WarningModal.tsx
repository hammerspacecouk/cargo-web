import * as React from "react";
import { WarningButton } from "../Atoms/Button";
import { P } from "../Atoms/Text";
import { ButtonRow } from "../Molecules/ButtonRow";
import { Modal, ModalType } from "../Molecules/Modal";

interface IProps {
  text?: string;
  closeModal: () => void;
}

export const WarningModal = ({ text, closeModal }: IProps) => {
  return (
    <Modal isOpen={text !== undefined} onClose={closeModal} title="Notice" type={ModalType.WARNING}>
      <P>{text}</P>
      <ButtonRow>
        <WarningButton onClick={closeModal}>Understood</WarningButton>
      </ButtonRow>
    </Modal>
  );
};
