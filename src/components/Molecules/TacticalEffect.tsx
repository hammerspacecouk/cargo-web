import * as React from "react";
import { IEffectAction, ITacticalOption } from "@src/interfaces";
import { EffectDetail } from "./EffectDetail";
import { DangerButton, Type } from "@src/components/Atoms/Button";
import { TokenButton } from "./TokenButton";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import { CountdownToTime } from "./CountdownToTime";
import { ComplexButton } from "./ComplexButton";
import { AlarmActiveIcon } from "@src/components/Icons/AlarmActiveIcon";
import { CheckboxEmpty } from "@src/components/Icons/CheckboxEmptyIcon";
import { CheckboxChecked } from "@src/components/Icons/CheckboxCheckedIcon";
import { getEffectColour } from "@src/components/Atoms/EffectSymbol";
import { ActionPane, ActionPaneButton, ActionPaneDetail } from "./ActionPane";
import { Modal } from "./Modal";
import { P } from "@src/components/Atoms/Text";
import { H4 } from "@src/components/Atoms/Heading";
import styled from "styled-components";
import { PlayerShipList } from "@src/components/Organisms/PlayerShipList";
import { GRID } from "@src/styles/variables";
import { COLOURS } from "@src/styles/colours";
import { SanctuaryIcon } from "@src/components/Icons/SanctuaryIcon";
import { Icon, TEXT_ICON } from "@src/components/Atoms/Icon";

interface IOffenceEffectProps {
  option: ITacticalOption;
}

export const TacticalEffect = ({ option }: IOffenceEffectProps) => {
  const { portActionHandler, buttonsDisabled, shipsInLocation, ship, port } = useActiveShipContext();
  const [chooseShipOpen, setChooseShipOpen] = React.useState(false);

  let actionButton;
  let chooseShipPanel;

  // todo - too complicated. can it be broken up
  if (option.actionToken) {
    actionButton = (
      <ActionButtonEnabled token={option.actionToken} handler={portActionHandler}>
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
    const applicableShips = shipsInLocation.filter((ship) => !!ship.offence);
    if (applicableShips.length) {
      actionButton = <DangerButton onClick={() => setChooseShipOpen(true)}>Choose Target</DangerButton>;
      const getActionButton = (offenses?: IEffectAction[]) => {
        const matchingEffect = (offenses || []).find((offense) => offense.effect.id === option.effect.id);
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
      actionButton = (
        <DangerButton disabled>
          {ship.shipClass.isProbe ? "N/A (Probe)" : port.isSafe ? <Sanctuary /> : "No Targets"}
        </DangerButton>
      );
    }
  } else if (port.isSafe) {
    actionButton = (
      <DangerButton disabled>
        <Sanctuary />
      </DangerButton>
    );
  } else if (port.blockade) {
    // todo - cleaner way to determine blockade
    actionButton = <DangerButton disabled>Blockaded</DangerButton>;
  } else {
    actionButton = (
      <ActionButtonDisabled icon={<CheckboxEmpty />} disabled={true}>
        {ship.shipClass.isProbe ? "N/A (Probe)" : "Engage"}
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

const Sanctuary = () => (
  <StyledSanctuary>
    Safe Zone
    <Icon size={TEXT_ICON}>
      <SanctuaryIcon />
    </Icon>
  </StyledSanctuary>
);
const StyledSanctuary = styled.span`
  display: flex;
  align-items: center;
  > :last-child {
    margin-left: ${GRID.HALF};
  }
`;

const ActionButtonDisabled = ComplexButton;
const ActionButtonEnabled = TokenButton;

const Ships = styled.div`
  margin-top: ${GRID.UNIT};
  padding-top: ${GRID.UNIT};
  border-top: solid 1px ${COLOURS.KEY_LINE};
  width: calc(100vw - ${GRID.QUADRUPLE});
  max-width: 500px;
`;
