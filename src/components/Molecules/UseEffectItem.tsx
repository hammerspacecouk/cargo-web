import * as React from "react";
import { IActionToken, IEffectAction } from "../../interfaces";
import { EffectDetail, LockedEffectDetail } from "./EffectDetail";
import { ActionButton } from "../Atoms/Button";
import { TokenButton } from "./TokenButton";
import { useActiveShipContext } from "../../contexts/ActiveShipContext/ActiveShipContext";
import { ActionRow, ActionRowButton, ActionRowContent } from "./ActionRow";

interface IOffenceEffectProps {
  option?: IEffectAction;
  doneHandler: () => void;
}

export const UseEffectItem = ({ option, doneHandler }: IOffenceEffectProps) => {
  const { portActionHandler, buttonsDisabled } = useActiveShipContext();

  if (!option) {
    return <LockedEffectDetail />;
  }

  const handler = async (token: IActionToken) => {
    await portActionHandler(token);
    doneHandler();
  };

  let actionButton;
  if (option.actionToken) {
    actionButton = (
      <TokenButton token={option.actionToken} handler={handler}>
        <ActionButton type="submit" disabled={buttonsDisabled}>
          Use
        </ActionButton>
      </TokenButton>
    );
  }

  return (
    <ActionRow>
      <ActionRowContent>
        <EffectDetail effect={option.effect} currentCount={option.currentCount} />
      </ActionRowContent>
      <ActionRowButton>{actionButton}</ActionRowButton>
    </ActionRow>
  );
};
