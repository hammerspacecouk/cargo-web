import * as React from "react";
import styled from "styled-components";
import { EffectType, IClassNameProps, IEffect } from "@src/interfaces";
import { SIZES } from "@src/styles/typography";
import { GRID } from "@src/styles/variables";
import { COLOURS } from "@src/styles/colours";
import { NumberBadge } from "./NumberBadge";

interface IProps extends IClassNameProps {
  effect?: IEffect;
  currentCount?: number;
}

export const EffectSymbol = React.memo(({ effect, className, currentCount }: IProps) => {
  let numberBadge;
  if (currentCount) {
    numberBadge = <PositionedNumberBadge value={currentCount} />;
  }

  return (
    <Outer effect={effect} className={className}>
      <InnerEffectSymbol effect={effect} />
      {numberBadge}
    </Outer>
  );
});

export const InnerEffectSymbol = ({ effect }: { effect: IEffect }) => <Inner>{getSymbol(effect)}</Inner>;

// Workings below

const PositionedNumberBadge = styled(NumberBadge)`
  position: absolute;
  top: -${GRID.HALF};
  right: -${GRID.HALF};
`;

export const getEffectColour = ({ effect }: { effect?: IEffect }) => {
  switch (effect && effect.type) {
    case EffectType.OFFENCE:
      return COLOURS.SEMANTIC.DANGER.KEY;
    case EffectType.TRAVEL:
      return COLOURS.SEMANTIC.WARNING.KEY;
    case EffectType.DEFENCE:
      return COLOURS.SEMANTIC.OK.KEY;
    default:
      return COLOURS.PANEL_INNER_DIVIDER;
  }
};

const Outer = styled.div<{ effect?: IEffect }>`
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: relative;
  border-bottom-left-radius: ${GRID.UNIT};
  border-top-right-radius: ${GRID.UNIT};
  user-select: none;
  border: dashed 1px ${COLOURS.PANEL_INNER_DIVIDER};
  border-bottom-color: ${getEffectColour};
  border-right-color: ${getEffectColour};
`;

const Inner = styled.div`
  transform: rotate(-45deg);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${SIZES.D};
`;

const getSymbol = (effect?: IEffect) => {
  return effect ? effect.name.substr(0, 2) : "?";
};
