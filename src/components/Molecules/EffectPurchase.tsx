import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import { EffectDetail } from "./EffectDetail";
import { IEffectPurchase, ILockedTransaction } from "@src/interfaces";
import { TokenButton } from "./TokenButton";
import { CreditsButton } from "./CreditsButton";
import * as React from "react";
import { TextF, TextWarning } from "@src/components/Atoms/Text";
import { getEffectColour } from "@src/components/Atoms/EffectSymbol";
import { ActionPane, ActionPaneButton, ActionPaneDetail } from "./ActionPane";

export const EffectPurchase = ({ option }: { option: IEffectPurchase | ILockedTransaction }) => {
  const { portActionHandler, buttonsDisabled } = useActiveShipContext();

  if ((option as ILockedTransaction).requirement) {
    return (
      <ActionPane>
        <TextF as="div">
          <TextWarning>{(option as ILockedTransaction).requirement}</TextWarning>
        </TextF>
      </ActionPane>
    );
  }

  const effect = (option as IEffectPurchase).detail;
  const transaction = option as IEffectPurchase;

  return (
    <ActionPane highlightColor={getEffectColour({ effect })}>
      <ActionPaneDetail>
        <EffectDetail effect={effect} />
      </ActionPaneDetail>
      <ActionPaneButton>
        <TokenButton token={transaction.actionToken} handler={portActionHandler}>
          <CreditsButton amount={transaction.cost} disabledOverride={buttonsDisabled} />
        </TokenButton>
      </ActionPaneButton>
    </ActionPane>
  );
};
