import * as React from "react";
import { IActionToken, ITacticalOption } from "../../interfaces";
import { EffectDetail, LockedEffectDetail } from "./EffectDetail";
import { ActionButton, ConfirmButton } from "../Atoms/Button";
import { TokenButton } from "./TokenButton";
import { useActiveShipContext } from "../../contexts/ActiveShipContext/ActiveShipContext";
import { ActionRow, ActionRowButton, ActionRowContent } from "./ActionRow";
import { CountdownToTime } from "./CountdownToTime";
import { CreditsButton } from "./CreditsButton";

interface IOffenceEffectProps {
  option: ITacticalOption;
}

export const TacticalEffect = React.memo(({ option }: IOffenceEffectProps) => {
  const { portActionHandler, buttonsDisabled } = useActiveShipContext();

  if (option.minimumRank) {
    return <LockedEffectDetail minimumRank={option.minimumRank}/>;
  }

  const handler = async (token: IActionToken) => {
    await portActionHandler(token);
  };

  let actionButton;
  let purchaseButton;

  if (option.actionToken) {
    actionButton = (
      <TokenButton token={option.actionToken} handler={handler}>
        <ActionButton type="submit" disabled={buttonsDisabled}>
          Use
        </ActionButton>
      </TokenButton>
    );
  } else if (option.hitsRemaining) {
    actionButton = <ActionButton disabled={true}>{option.hitsRemaining} hits remaining</ActionButton>;
  } else if (option.expiry) {
    actionButton = <ConfirmButton disabled={true}><CountdownToTime dateTime={option.expiry}/></ConfirmButton>;
  }

  if (option.purchaseToken) {
    purchaseButton = (
      <TokenButton token={option.purchaseToken.actionToken} handler={portActionHandler}>
        <CreditsButton
          amount={option.purchaseToken.cost}
          disabledOverride={buttonsDisabled}/>
      </TokenButton>
    );
  }

  return (
    <ActionRow>
      <ActionRowContent>
        <EffectDetail effect={option.effect} currentCount={option.currentCount}/>
      </ActionRowContent>
      <ActionRowButton>{purchaseButton}</ActionRowButton>
      <ActionRowButton>{actionButton}</ActionRowButton>
    </ActionRow>
  );
});
