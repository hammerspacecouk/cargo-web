import * as React from "react";
import { IEffectAction } from "@src/interfaces";
import { DangerButton } from "@src/components/Atoms/Button";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import { TokenButton } from "@src/components/Molecules/TokenButton";
import { ListInline } from "@src/components/Atoms/List/ListInline";
import { InnerEffectSymbol } from "@src/components/Atoms/EffectSymbol";
import styled from "styled-components";
import { NumberBadge } from "@src/components/Atoms/NumberBadge";
import { GRID } from "@src/styles/variables";

export const OffenceActions = ({ actions }: IProps) => {
  const { portActionHandler, buttonsDisabled } = useActiveShipContext();

  if (!actions) {
    return null;
  }

  return (
    <ListInline spaced>
      {actions.map((option: IEffectAction) => (
        <li key={option.effect.id}>
          <TokenButton token={option.actionToken} handler={portActionHandler}>
            <ActionButton disabled={buttonsDisabled} title={option.effect.name}>
              <InnerEffectSymbol effect={option.effect} />
            </ActionButton>
          </TokenButton>
          <PositionedNumberBadge value={option.currentCount} />
        </li>
      ))}
    </ListInline>
  );
};

interface IProps {
  actions?: IEffectAction[];
}

const PositionedNumberBadge = styled(NumberBadge)`
  position: absolute;
  top: -${GRID.HALF};
  right: -${GRID.HALF};
`;

const ActionButton = styled(DangerButton)`
  padding: 0;
  width: 40px;
  height: 40px;
  position: relative;
  text-transform: none;
`;
