import * as React from "react";
import styled, { css, keyframes } from "styled-components";
import { IEffect } from "../../../Interfaces";
import { COLOURS, hexToRGBa } from "../../../styles/colours";
import { SIZES } from "../../../styles/typography";
import { buttonColours, Type } from "../../Atoms/Button/Button";

interface IProps {
  readonly effect?: IEffect;
  readonly isButton?: boolean;
  readonly isActive?: boolean;
  readonly disabled?: boolean;
}

export const EFFECT_WIDTH = "64px";

const activeFrames = keyframes`
    0% {
        border-color: ${COLOURS.BASE};
    }
    50% {
        border-color: ${hexToRGBa(COLOURS.BASE, 0.8)};
    }
    100% {
        border-color: ${COLOURS.BASE};
    }
`;


// todo - get a handle on this styling.
// todo - available = purple
// todo - inactive = faded
// todo - unknown = grey/whitefaded
// todo - active = green/yellow/blue
const StyledEffectWrap = styled.div<{
  locked: boolean;
  disabled: boolean;
  isActive: boolean;
  isButton: boolean;
}>`
  width: ${EFFECT_WIDTH};
  user-select: none;
  padding-top: calc(100% - 16px);
  ${buttonColours(Type.Action)};
  
  position: relative;
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
  border-top-right-radius: 100%;
  transform: rotate(45deg);
  margin-top: 16px;
  transition: all 0.15s linear;
  ${({ locked, disabled }) =>
    locked || disabled
      ? css`
          opacity: 0.2;
        `
      : ""}
  ${({ isButton, disabled }) =>
    isButton && !disabled
      ? css`
          border-color: ${COLOURS.WHITE.STANDARD};
          box-shadow: 0 0 16px ${COLOURS.WHITE.STANDARD};
          &:hover,
          &:focus {
            box-shadow: 0 0 32px ${COLOURS.WHITE.STANDARD};
          }
        `
      : ""}
  ${({ isActive }) =>
    isActive &&
    css`
      border-color: ${COLOURS.BASE};
      animation: ${activeFrames} 2s ease-in-out infinite;
    `}
`;

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

export const Effect = ({
  effect,
  isActive = false,
  disabled = false,
  isButton = false,
}: IProps) => {
  let symbol = "?";

  if (effect) {
    symbol = effect.name.substr(0, 2);
  }

  return (
    <StyledEffectWrap
      locked={effect === null}
      isActive={isActive}
      isButton={isButton}
      disabled={disabled}
    >
      <StyledEffectInner>{symbol}</StyledEffectInner>
    </StyledEffectWrap>
  );
};
