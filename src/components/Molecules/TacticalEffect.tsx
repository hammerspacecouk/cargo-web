import * as React from "react";
import { IActionToken, IEffect, ITacticalOption } from "../../interfaces";
import { EffectDetail } from "./EffectDetail";
import { Type } from "../Atoms/Button";
import { TokenButton } from "./TokenButton";
import { useActiveShipContext } from "../../contexts/ActiveShipContext/ActiveShipContext";
import { CountdownToTime } from "./CountdownToTime";
import { ComplexButton } from "./ComplexButton";
import { AlarmActiveIcon } from "../Icons/AlarmActiveIcon";
import styled from "styled-components";
import { CheckboxEmpty } from "../Icons/CheckboxEmptyIcon";
import { CheckboxChecked } from "../Icons/CheckboxCheckedIcon";
import { ButtonRow } from "./ButtonRow";
import { GRID } from "../../styles/variables";
import { COLOURS } from "../../styles/colours";
import { getEffectColour } from "../Atoms/EffectSymbol";

interface IOffenceEffectProps {
  option: ITacticalOption;
}

export const TacticalEffect = ({ option }: IOffenceEffectProps) => {
  const { portActionHandler, buttonsDisabled } = useActiveShipContext();

  const handler = async (token: IActionToken) => {
    await portActionHandler(token);
  };

  let actionButton;

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
  } else if (!option.mustSelectShip) {
    actionButton = (
      <ActionButtonDisabled icon={<CheckboxEmpty />} disabled={true}>
        Engage
      </ActionButtonDisabled>
    );
  }

  return (
    <EffectPane effect={option.effect}>
      <DetailCell>
        <EffectDetail effect={option.effect} currentCount={option.currentCount} />
      </DetailCell>
      <StyledButtonRow>{actionButton}</StyledButtonRow>
    </EffectPane>
  );
};

// todo - de-duplicate other usages
const EffectPane = styled.div<{ effect?: IEffect }>`
  padding: ${GRID.UNIT};
  border: solid 1px ${COLOURS.GREY.BLACK};
  background: ${COLOURS.GREY.DARKEST};
  border-radius: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
  border-top-color: ${getEffectColour};
`;

const DetailCell = styled.div`
  width: 100%;
`;

const StyledButtonRow = styled.div`
  margin-top: ${GRID.UNIT};
  display: flex;
  justify-content: center;
`;
const ActionButtonDisabled = ComplexButton;
const ActionButtonEnabled = TokenButton;
