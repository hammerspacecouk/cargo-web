import * as React from "react";
import { useActiveShipContext } from "../ActiveShipContext";
import { IEffectUpgrade } from "../../../../Interfaces";
import { TokenButton } from "../../../../components/Molecules/TokenButton/TokenButton";
import { CreditsButton } from "../../Components/CreditsButton";
import { EffectDetail, LockedEffectDetail } from "../../../../components/Molecules/EffectDetail/EffectDetail";
import { ListLined } from "../../../../components/Atoms/Lists/ListLined/ListLined";
import { ActionRow, ActionRowButton, ActionRowContent } from "../../../../components/Molecules/ActionRow/ActionRow";

const Effect = ({ buttonsDisabled, effect }: { buttonsDisabled: boolean; effect: IEffectUpgrade }) => {
  const { portActionHandler } = useActiveShipContext();

  if (!effect) {
    // todo - show minimum rank
    return <LockedEffectDetail />;
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
