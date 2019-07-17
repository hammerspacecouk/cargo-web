import * as React from "react";
import styled, { css } from "styled-components";
import { IEffect } from "../../interfaces";
import { SIZES } from "../../styles/typography";
import { buttonColours, Type } from "../Atoms/Button";
import { GRID } from "../../styles/variables";

interface IProps {
  readonly effect?: IEffect;
  readonly isButton?: boolean;
  readonly isActive?: boolean;
  readonly disabled?: boolean;
}

export const EFFECT_WIDTH = "48px";

const StyledEffectWrap = styled.div<{
  locked: boolean;
  disabled: boolean;
  isActive: boolean;
  isButton: boolean;
}>`
  width: ${EFFECT_WIDTH};
  height: ${EFFECT_WIDTH};
  user-select: none;
  padding-top: calc(100% - 16px);
  position: relative;
  border-bottom-left-radius: ${GRID.UNIT};
  border-top-right-radius: ${GRID.UNIT};
  transition: all 0.15s linear;
  ${({ locked }) => buttonColours(locked ? null : Type.Action)}
  ${({ disabled, locked }) =>
    (disabled || locked) &&
    css`
      opacity: ${locked ? 0.1 : 0.3};
    `}
  ${({ isButton, disabled }) => isButton && !disabled && buttonColours(Type.Action)}
  ${({ isActive }) =>
    isActive &&
    css`
      ${buttonColours(Type.Confirm)};
    `}
`; // todo - hover state same as button

const StyledEffectInner = styled.div`
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

export const Effect = ({ effect, isActive = false, disabled = false, isButton = false }: IProps) => {
  let symbol = "?";

  if (effect) {
    symbol = effect.name.substr(0, 2);
  }

  return (
    <StyledEffectWrap locked={!effect} isActive={isActive} isButton={isButton} disabled={disabled}>
      <StyledEffectInner>{symbol}</StyledEffectInner>
    </StyledEffectWrap>
  );
};
