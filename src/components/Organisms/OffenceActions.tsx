import * as React from "react";
import { IEffectAction, IShip } from "../../interfaces";
import { AttackButton } from "../Atoms/Button";
import { Modal } from "../Molecules/Modal";
import { useActiveShipContext } from "../../contexts/ActiveShipContext/ActiveShipContext";
import { UseEffectItem } from "../Molecules/UseEffectItem";
import { ListLined } from "../Atoms/List/ListLined";

interface IProps {
  actions?: IEffectAction[];
  ship: IShip;
}

export const OffenceActions = ({ actions, ship }: IProps) => {
  const [showModal, setShowModal] = React.useState(false);
  const { buttonsDisabled } = useActiveShipContext();

  if (!actions) {
    return null;
  }

  let modal = null;
  if (showModal) {
    modal = (
      <Modal isOpen={true} title={`Attack ${ship.name}?`} onClose={() => setShowModal(false)}>
        <ListLined>
          {actions.map(option => (
            <li key={option.effect.id}>
              <UseEffectItem option={option} doneHandler={() => setShowModal(false)} />
            </li>
          ))}
        </ListLined>
      </Modal>
    );
  }

  return (
    <>
      <AttackButton disabled={buttonsDisabled} onClick={() => setShowModal(true)} />
      {modal}
    </>
  );
};
