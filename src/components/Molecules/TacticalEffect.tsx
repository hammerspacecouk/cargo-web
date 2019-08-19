import * as React from "react";
import { IActionToken, ITacticalOption } from "../../interfaces";
import { EffectDetail, LockedEffectDetail } from "./EffectDetail";
import { Type } from "../Atoms/Button";
import { TokenButton } from "./TokenButton";
import { useActiveShipContext } from "../../contexts/ActiveShipContext/ActiveShipContext";
import { CountdownToTime } from "./CountdownToTime";
import { CreditsButton } from "./CreditsButton";
import { ComplexButton } from "./ComplexButton";
import { TickIcon } from "../Icons/TickIcon";
import { AlarmActiveIcon } from "../Icons/AlarmActiveIcon";
import { AttackIcon } from "../Icons/AttackIcon";
import styled from "styled-components";

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
  const label = "Engage";

  if (option.actionToken) {
    actionButton = (
      <TokenButton token={option.actionToken} handler={handler}>
        <ComplexButton icon={<TickIcon />} type="submit" disabled={buttonsDisabled}>
          {label}
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
        icon={<AttackIcon />}
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
  } else if (!option.mustSelectShip) {
    actionButton = (
      <ComplexButton icon={<TickIcon />} disabled={true}>
        {label}
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
