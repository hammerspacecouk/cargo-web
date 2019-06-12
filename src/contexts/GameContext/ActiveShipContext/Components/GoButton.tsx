import * as React from "react";
import { ActionButton, ConfirmButton } from "../../../../components/Atoms/Button/Button";
import { IntervalFormat } from "../../../../components/Atoms/IntervalFormat/IntervalFormat";
import { StackedButton } from "../../../../components/Molecules/StackedButton/StackedButton";
import { TokenButton } from "../../../../components/Molecules/TokenButton/TokenButton";
import { IActionToken, IDirection } from "../../../../Interfaces";
import { useActiveShipContext } from "../ActiveShipContext";
import { Modal, ModalActions, ModalType } from "../../../../components/Molecules/Modal/Modal";
import { P } from "../../../../components/Atoms/Text/Text";

interface IProps {
  direction: IDirection;
  journeyTime: number;
  children: JSX.Element;
}

export const GoButton = ({ direction, journeyTime, children }: IProps) => {
  const { buttonsDisabled, cratesOnShip, cratesInPort, ship, portActionHandler } = useActiveShipContext();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const buttonIsDisabled = direction.action === null || buttonsDisabled;

  if (cratesOnShip === undefined) {
    return null;
  }

  const closeModal = () => setModalIsOpen(false);

  const buttonHandler = () => {
    if (cratesOnShip.length === 0 && ship.shipClass.capacity > 0 && cratesInPort.length > 0) {
      setModalIsOpen(true);
    } else if (direction.action) {
      setModalIsOpen(false);
      portActionHandler(direction.action);
    }
  };

  let modal;
  if (modalIsOpen) {
    modal = (
      <Modal isOpen={true} title="Confirm?" onClose={closeModal} type={ModalType.WARNING}>
        <P>You have not picked up any crates. Are you sure you want to leave?</P>
        <ModalActions>
          <TokenButton token={direction.action} handler={portActionHandler}>
            <ActionButton disabled={buttonIsDisabled} type="submit">Yes</ActionButton>
          </TokenButton>{" "}
          <ConfirmButton onClick={closeModal}>Cancel</ConfirmButton>
        </ModalActions>
      </Modal>
    )
  }

  return (
    <>
      <StackedButton
        type="submit"
        disabled={buttonIsDisabled}
        icon={children}
        onClick={buttonHandler}
      >
        <IntervalFormat seconds={journeyTime} />
      </StackedButton>
      {modal}
    </>
  );
};
