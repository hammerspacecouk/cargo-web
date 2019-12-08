import * as React from "react";
import { IActionToken, IEffectAction, IShip, ITacticalOption } from "../../interfaces";
import { EffectDetail } from "./EffectDetail";
import {ActionButton, AttackButton, DangerButton, Type} from "../Atoms/Button";
import { TokenButton } from "./TokenButton";
import { useActiveShipContext } from "../../contexts/ActiveShipContext/ActiveShipContext";
import { CountdownToTime } from "./CountdownToTime";
import { ComplexButton } from "./ComplexButton";
import { AlarmActiveIcon } from "../Icons/AlarmActiveIcon";
import { CheckboxEmpty } from "../Icons/CheckboxEmptyIcon";
import { CheckboxChecked } from "../Icons/CheckboxCheckedIcon";
import { getEffectColour } from "../Atoms/EffectSymbol";
import { ActionPane, ActionPaneButton, ActionPaneDetail } from "./ActionPane";
import { Modal } from "./Modal";
import { P } from "../Atoms/Text";
import { H4 } from "../Atoms/Heading";
import styled from "styled-components";
import { PlayerShipList } from "../Organisms/PlayerShipList";
import { GRID } from "../../styles/variables";
import { COLOURS } from "../../styles/colours";

interface IOffenceEffectProps {
  option: ITacticalOption;
}

export const TacticalEffect = ({ option }: IOffenceEffectProps) => {
  const { portActionHandler, buttonsDisabled, shipsInLocation, ship } = useActiveShipContext();
  const [chooseShipOpen, setChooseShipOpen] = React.useState(false);

  const handler = async (token: IActionToken) => {
    await portActionHandler(token);
  };

  let actionButton;
  let chooseShipPanel;

  if (option.actionToken) {
    actionButton = (
      <ActionButtonEnabled token={option.actionToken} handler={handler}>
        <ComplexButton icon={<CheckboxEmpty />} type="submit" disabled={buttonsDisabled}>
          Engage
        </ComplexButton>
      </ActionButtonEnabled>
    );
  } else if (option.hitsRemaining) {
    // todo - max hits to come from database
    let type = Type.Confirm;
    if (option.hitsRemaining === 1) {
      type = Type.Danger;
    }
    if (option.hitsRemaining === 2) {
      type = Type.Warning;
    }
    actionButton = (
      <ActionButtonDisabled
        icon={<CheckboxChecked />}
        disabled={true}
        title={`${option.hitsRemaining} hits remaining`}
        styleType={type}
      >
        {option.hitsRemaining}/3
      </ActionButtonDisabled>
    );
  } else if (option.expiry) {
    actionButton = (
      <ActionButtonDisabled icon={<AlarmActiveIcon />} disabled={true} title="Active" styleType={Type.Confirm}>
        <CountdownToTime dateTime={option.expiry} />
      </ActionButtonDisabled>
    );
  } else if (option.isActive) {
    actionButton = (
      <ActionButtonDisabled icon={<CheckboxChecked />} styleType={Type.Confirm} disabled={true}>
        Engaged
      </ActionButtonDisabled>
    );
  } else if (option.mustSelectShip) {
    const applicableShips = shipsInLocation.filter(ship => !!ship.offence);
    if (applicableShips.length) {
      actionButton = <DangerButton onClick={() => setChooseShipOpen(true)}>Choose Target</DangerButton>;
      const getActionButton = (offenses?: IEffectAction[]) => {
        const matchingEffect = (offenses || []).find(offense => offense.effect.id === option.effect.id);
        if (matchingEffect) {
          return (
            <TokenButton token={matchingEffect.actionToken} handler={portActionHandler}>
              <DangerButton disabled={buttonsDisabled}>Fire</DangerButton>
            </TokenButton>
          );
        }
        return null;
      };
      chooseShipPanel = (
        <Modal isOpen={chooseShipOpen} title="Choose Target" onClose={() => setChooseShipOpen(false)}>
          <H4>{option.effect.name}</H4>
          <P>{option.effect.description}</P>
          <Ships>
            <PlayerShipList ships={applicableShips} getActionButton={getActionButton} />
          </Ships>
        </Modal>
      );
    } else {
      actionButton = <DangerButton disabled>{ship.shipClass.capacity === 0 ? 'N/A (Probe)' : 'No Targets'}</DangerButton>;
    }
  } else {
    actionButton = (
      <ActionButtonDisabled icon={<CheckboxEmpty />} disabled={true}>
        {ship.shipClass.capacity === 0 ? 'N/A (Probe)' : 'Engage'}
      </ActionButtonDisabled>
    );
  }

  return (
    <>
      <ActionPane highlightColor={getEffectColour({ effect: option.effect })}>
        <ActionPaneDetail>
          <EffectDetail effect={option.effect} currentCount={option.currentCount} />
        </ActionPaneDetail>
        <ActionPaneButton>{actionButton}</ActionPaneButton>
      </ActionPane>
      {chooseShipPanel}
    </>
  );
};

const ActionButtonDisabled = ComplexButton;
const ActionButtonEnabled = TokenButton;

const Ships = styled.div`
  margin-top: ${GRID.UNIT};
  padding-top: ${GRID.UNIT};
  border-top: solid 1px ${COLOURS.KEY_LINE};
  width: calc(100vw - ${GRID.QUADRUPLE});
  max-width: 500px;
`;
