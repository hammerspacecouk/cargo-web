import * as React from "react";
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import { IEffectUpgrade } from "../../../../interfaces";
import { TokenButton } from "../../../Molecules/TokenButton";
import { CreditsButton } from "../../../Molecules/CreditsButton";
import { EffectDetail } from "../../../Molecules/EffectDetail";
import { ListLined } from "../../../Atoms/List/ListLined";
import { ActionRow, ActionRowButton, ActionRowContent } from "../../../Molecules/ActionRow";

// todo - delete me
const Effect = ({ buttonsDisabled, effect }: { buttonsDisabled: boolean; effect: IEffectUpgrade }) => {
  const { portActionHandler } = useActiveShipContext();

  if (!effect) {
    // todo - show minimum rank
  }

  let tokenButton = null;
  if (effect.actionToken) {
    tokenButton = (
      <TokenButton token={effect.actionToken} handler={portActionHandler}>
        <CreditsButton amount={effect.cost} disabledOverride={buttonsDisabled} />
      </TokenButton>
    );
  }

  return (
    <ActionRow>
      <ActionRowContent>
        <EffectDetail effect={effect.detail} currentCount={effect.currentCount} />
      </ActionRowContent>
      <ActionRowButton>{tokenButton}</ActionRowButton>
    </ActionRow>
  );
};

export const Trade = () => {
  const { purchaseOptions, buttonsDisabled } = useActiveShipContext();
  if (!purchaseOptions) {
    return null;
  }

  return (
    <ListLined>
      {purchaseOptions.map((effect, i) => (
        <li key={effect && effect.detail ? effect.detail.id : i}>
          <Effect buttonsDisabled={buttonsDisabled} effect={effect} />
        </li>
      ))}
    </ListLined>
  );
};
