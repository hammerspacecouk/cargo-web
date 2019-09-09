import * as React from "react";
import { IActionToken, ITacticalOption } from "../../interfaces";
import { EffectDetail, LockedEffectDetail } from "./EffectDetail";
import { Type } from "../Atoms/Button";
import { TokenButton } from "./TokenButton";
import { useActiveShipContext } from "../../contexts/ActiveShipContext/ActiveShipContext";
import { CountdownToTime } from "./CountdownToTime";
import { CreditsButton } from "./CreditsButton";
import { ComplexButton } from "./ComplexButton";
import { AlarmActiveIcon } from "../Icons/AlarmActiveIcon";
import styled from "styled-components";
import { CheckboxEmpty } from "../Icons/CheckboxEmptyIcon";
import { CheckboxChecked } from "../Icons/CheckboxCheckedIcon";
import { ButtonRow } from "./ButtonRow";

interface IOffenceEffectProps {
  option: ITacticalOption;
}

export const TacticalEffect = ({ option }: IOffenceEffectProps) => {
  const { portActionHandler, buttonsDisabled } = useActiveShipContext();

  if (option.minimumRank) {
    return <LockedEffectDetail minimumRank={option.minimumRank} />;
  }

  const handler = async (token: IActionToken) => {
    await portActionHandler(token);
  };

  let actionButton;
  let purchaseButton;

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

  if (option.purchaseToken) {
    purchaseButton = (
      <TokenButton token={option.purchaseToken.actionToken} handler={portActionHandler}>
        <CreditsButton amount={option.purchaseToken.cost} disabledOverride={buttonsDisabled} />
      </TokenButton>
    );
  }

  return (
    <div>
      <DetailCell>
        <EffectDetail effect={option.effect} currentCount={option.currentCount} />
      </DetailCell>
      <StyledButtonRow>
        {purchaseButton}
        {actionButton}
      </StyledButtonRow>
    </div>
  );
};

const DetailCell = styled.div`
  width: 100%;
`;

const StyledButtonRow = styled(ButtonRow)`
  justify-content: flex-start;
`;
const ActionButtonDisabled = styled(ComplexButton)`
  margin-left: auto;
`;
const ActionButtonEnabled = styled(TokenButton)`
  margin-left: auto;
`;
