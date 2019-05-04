import * as React from "react";
import { Modal } from "../../../../components/Molecules/Modal/Modal";

interface IProps {
  closeHandler: () => void;
}

export const ShipNameModal = ({closeHandler}: IProps) => {
  return (
    <Modal isOpen={true} onClose={closeHandler} title="Request new ship name">
      <div>RENAME SHIP</div>
    </Modal>
  );
};
