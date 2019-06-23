import * as React from "react";
import { IEffectUpgrade } from "../../../../interfaces";
import { Effect } from "../../../Molecules/Effect";
import {
  PurchaseCard,
  PurchaseCardDescription,
  PurchaseCardDetail,
  PurchaseCardImage,
  PurchaseCardTitle,
} from "../../../Molecules/PurchaseCard";
import { P } from "../../../Atoms/Text";

interface IProps {
  effect?: IEffectUpgrade;
}

export const EffectUpgrade = ({ effect }: IProps) => {
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
    /*
    if (effect.actionToken) {
      purchaseButton = (
        <TokenButton token={effect.actionToken} handler={makePurchase}>
          <CreditsButton amount={effect.cost} disabledOverride={buttonsDisabled} />
        </TokenButton>
      );
    }
    */
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
