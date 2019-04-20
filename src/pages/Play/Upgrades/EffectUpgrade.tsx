import * as React from "react";
import { CreditsButton } from "../../../contexts/GameContext/Components/CreditsButton";
import { TokenButton } from "../../../components/Molecules/TokenButton/TokenButton";
import { useUpgradesContext } from "../../../context/Page/UpgradesContext";
import { IEffectUpgrade } from "../../../Interfaces";
import { Effect } from "../../../components/Molecules/Effect/Effect";
import {
  PurchaseCard,
  PurchaseCardDescription,
  PurchaseCardDetail,
  PurchaseCardImage,
  PurchaseCardTitle,
} from "../../../components/Molecules/PurchaseCard/PurchaseCard";
import { P } from "../../../components/Atoms/Text/Text";

interface IProps {
  effect?: IEffectUpgrade;
}

export const EffectUpgrade = ({ effect }: IProps) => {
  const { buttonsDisabled, makePurchase } = useUpgradesContext();

  let purchaseButton = null;
  let title = null;
  let description = null;

  if (effect) {
    title = <PurchaseCardTitle>{effect.detail.name}</PurchaseCardTitle>;
    description = (
      <PurchaseCardDescription>
        <P>{effect.detail.description}</P>
      </PurchaseCardDescription>
    );

    if (effect.actionToken) {
      purchaseButton = (
        <TokenButton token={effect.actionToken} handler={makePurchase}>
          <CreditsButton
            amount={effect.cost}
            disabledOverride={buttonsDisabled}
          />
        </TokenButton>
      );
    }
  }

  return (
    <PurchaseCard>
      <PurchaseCardDetail>
        {title}
        {description}
        {purchaseButton}
      </PurchaseCardDetail>

      <PurchaseCardImage notificationCount={effect && effect.currentCount}>
        <Effect effect={effect && effect.detail} />
      </PurchaseCardImage>
    </PurchaseCard>
  );
};
