import * as React from "react";
import { WarningButton } from "@src/components/Atoms/Button";
import { P } from "@src/components/Atoms/Text";
import { ButtonRow } from "@src/components/Molecules/ButtonRow";
import { Modal, ModalType } from "@src/components/Molecules/Modal";

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
