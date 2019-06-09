import * as React from "react";
import { IEffectAction, IShip } from "../../../Interfaces";
import { AttackButton } from "../../Atoms/Button/Button";
import { Modal } from "../../Molecules/Modal/Modal";
import { useActiveShipContext } from "../../../contexts/GameContext/ActiveShipContext/ActiveShipContext";
import { UseEffectItem } from "../../Molecules/UseEffectItem/UseEffectItem";
import { ListLined } from "../../Atoms/Lists/ListLined/ListLined";

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
