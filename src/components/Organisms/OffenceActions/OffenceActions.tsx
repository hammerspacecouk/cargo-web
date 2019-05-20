import * as React from "react";
import styled from "styled-components";
import { IActionToken, IOffenceOption } from "../../../Interfaces";
import { EffectActionButton } from "../../Molecules/EffectActionButton/EffectActionButton";
import { EffectsRow } from "../EffectsRow/EffectsRow";
import { Effect } from "../../Molecules/Effect/Effect";
import { AttackIcon } from "../../Icons/AttackIcon/AttackIcon";
import { DangerButton } from "../../Atoms/Button/Button";
import { Modal } from "../../Molecules/Modal/Modal";
import { useActiveShipContext } from "../../../contexts/GameContext/ActiveShipContext/ActiveShipContext";
import { COLOURS } from "../../../styles/colours";

interface IProps {
  actions?: IOffenceOption[];
}

interface IOffenceEffectProps {
  option: IOffenceOption;
  doneHandler: () => void;
}

const AttackButton = styled(DangerButton)`
    width: 100%;
    padding: 4px 6px;
`;

const OffenceEffect = ({ option, doneHandler }: IOffenceEffectProps) => {
  const { portActionHandler, buttonsDisabled } = useActiveShipContext();

  const handler = async (token: IActionToken) => {
    await portActionHandler(token);
    doneHandler();
  };

  if (option.actionToken) {
    return (
      <EffectActionButton
        key={option.effect.name}
        effect={option.effect}
        token={option.actionToken}
        disabled={buttonsDisabled}
        handler={handler}
      />
    );
  }

  return <Effect disabled={true} effect={option.effect} />;
};

export const OffenceActions = ({ actions }: IProps) => {
  const [showModal, setShowModal] = React.useState(false);
  const { buttonsDisabled } = useActiveShipContext();


  if (!actions) {
    return null;
  }

  let modal = null;
  if (showModal) {
    modal = (
      <Modal
        isOpen={true}
        title="Attack ship"
        onClose={() => setShowModal(false)}
      >
        <EffectsRow>
          {actions.map(option => (
            <OffenceEffect
              key={option.effect.name}
              option={option}
              doneHandler={() => setShowModal(false)}
            />
          ))}
        </EffectsRow>
      </Modal>
    )
  }

  return (
    <>
      <AttackButton
        disabled={buttonsDisabled}
        onClick={() => setShowModal(true)}
      >
        <AttackIcon />
      </AttackButton>
      {modal}
    </>
  );
};
