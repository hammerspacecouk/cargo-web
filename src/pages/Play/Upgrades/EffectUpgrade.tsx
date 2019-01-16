import * as React from "react";
import { TextCenter } from "../../../components/Atoms/Text/Text";
import { CreditsButton } from "../../../components/Molecules/CreditsButton/CreditsButton";
import { TokenButton } from "../../../components/Molecules/TokenButton/TokenButton";
import { useUpgradesContext } from "../../../context/Page/UpgradesContext";
import { IEffectUpgrade } from "../../../Interfaces";

interface IProps {
  effect?: IEffectUpgrade;
}

export const EffectUpgrade = ({ effect }: IProps) => {
  const { buttonsDisabled, makePurchase } = useUpgradesContext();

  if (!effect) {
    return <div>LOCKED</div>; // todo - design this
  }

  let purchaseButton = null;
  if (effect.actionToken) {
    purchaseButton = (
      <TokenButton token={effect.actionToken} handler={makePurchase}>
        <CreditsButton amount={effect.cost} disabledOverride={buttonsDisabled} />
      </TokenButton>
    );
  }

  return (
    <TextCenter>
      <h3>
        {effect.detail.name} ({effect.currentCount})
      </h3>
      {/* todo - image */}
      <p>{effect.detail.description}</p>
      {purchaseButton}
    </TextCenter>
  );
};
