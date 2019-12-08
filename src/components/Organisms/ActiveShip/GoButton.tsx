import * as React from "react";
import { ActionButton, ConfirmButton } from "../../Atoms/Button";
import { IntervalFormat } from "../../Atoms/IntervalFormat";
import { TokenButton } from "../../Molecules/TokenButton";
import { IDirection } from "../../../interfaces";
import { useActiveShipContext } from "../../../contexts/ActiveShipContext/ActiveShipContext";
import { Modal, ModalType } from "../../Molecules/Modal";
import { P } from "../../Atoms/Text";
import { ACTIVE_VIEW } from "../../../contexts/ActiveShipContext/useActiveShip";
import { ButtonRow } from "../../Molecules/ButtonRow";

interface IProps {
  direction: IDirection;
  journeyTime: number;
}

export const GoButton = ({ direction, journeyTime }: IProps) => {
  const { buttonsDisabled, cratesOnShip, cratesInPort, ship, departureHandler, setActiveView } = useActiveShipContext();
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const buttonIsDisabled = direction.action === null || buttonsDisabled;

  if (cratesOnShip === undefined) {
    return null;
  }

  const goToCrates = () => {
    setActiveView(ACTIVE_VIEW.CARGO);
    setModalIsOpen(false);
  };

  const closeModal = () => setModalIsOpen(false);

  const buttonHandler = () => {
    if (cratesOnShip.length === 0 && ship.shipClass.capacity > 0 && cratesInPort.length > 0) {
      setModalIsOpen(true);
    } else if (direction.action) {
      setModalIsOpen(false);
      departureHandler(direction.action);
    }
  };

  let modal;
  if (modalIsOpen) {
    modal = (
      <Modal isOpen={true} title="Confirm?" onClose={closeModal} type={ModalType.WARNING}>
        <P>You have not picked up any crates. Are you sure you want to leave?</P>
        <ButtonRow>
          <TokenButton token={direction.action} handler={departureHandler}>
            <ActionButton disabled={buttonIsDisabled} type="submit">
              Yes
            </ActionButton>
          </TokenButton>
          <ConfirmButton onClick={goToCrates}>Crates</ConfirmButton>
          <ConfirmButton onClick={closeModal}>Cancel</ConfirmButton>
        </ButtonRow>
      </Modal>
    );
  }

  return (
    <>
      <ActionButton type="submit" disabled={buttonIsDisabled} onClick={buttonHandler}>
        <IntervalFormat seconds={journeyTime} />
      </ActionButton>
      {modal}
    </>
  );
};
