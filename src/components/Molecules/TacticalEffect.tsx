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

interface IOffenceEffectProps {
  option: ITacticalOption;
}

export const TacticalEffect = ({ option }: IOffenceEffectProps) => {
  const { portActionHandler, buttonsDisabled } = useActiveShipContext();

  if (option.minimumRank) {
    return (
      <tr>
        <td colSpan={3}>
          <LockedEffectDetail minimumRank={option.minimumRank} />
        </td>
      </tr>
    );
  }

  const handler = async (token: IActionToken) => {
    await portActionHandler(token);
  };

  let actionButton;
  let purchaseButton;

  if (option.actionToken) {
    actionButton = (
      <TokenButton token={option.actionToken} handler={handler}>
        <ComplexButton icon={<CheckboxEmpty />} type="submit" disabled={buttonsDisabled}>
          Engage
        </ComplexButton>
      </TokenButton>
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
      <ComplexButton
        icon={<CheckboxChecked />}
        disabled={true}
        title={`${option.hitsRemaining} hits remaining`}
        styleType={type}
      >
        {option.hitsRemaining}/3
      </ComplexButton>
    );
  } else if (option.expiry) {
    actionButton = (
      <ComplexButton icon={<AlarmActiveIcon />} disabled={true} title="Active" styleType={Type.Confirm}>
        <CountdownToTime dateTime={option.expiry} />
      </ComplexButton>
    );
  } else if (option.isActive) {
    actionButton = (
      <ComplexButton icon={<CheckboxChecked />} styleType={Type.Confirm} disabled={true}>
        Engaged
      </ComplexButton>
    );
  } else if (!option.mustSelectShip) {
    actionButton = (
      <ComplexButton icon={<CheckboxEmpty />} disabled={true}>
        Engage
      </ComplexButton>
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
    <tr>
      <DetailCell>
        <EffectDetail effect={option.effect} currentCount={option.currentCount} />
      </DetailCell>
      <td>{purchaseButton}</td>
      <td>{actionButton}</td>
    </tr>
  );
};

const DetailCell = styled.td`
  width: 100%;
`;
