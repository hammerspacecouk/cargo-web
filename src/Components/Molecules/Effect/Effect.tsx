import * as React from "react";
import styled, { css, keyframes } from "styled-components";
import { IEffect } from "../../../Interfaces";
import { COLOURS, hexToRGBa } from "../../../styles/colours";

interface IProps {
  readonly effect?: IEffect;
  readonly isButton?: boolean;
  readonly isActive?: boolean;
  readonly disabled?: boolean;
}

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

const StyledEffectWrap = styled.div<{ locked: boolean, disabled: boolean, isActive: boolean, isButton: boolean }>`
  width: 64px;
  user-select: none;
  padding-top: calc(100% - 16px);
  border: 8px solid hsl(0, 0%, 48%);
  position: relative;
  background: hsl(264, 45%, 12%);
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
  border-top-right-radius: 100%;
  transform: rotate(45deg);
  margin-top: 16px;
  transition: all 0.15s linear;
  ${({ locked, disabled }) => (locked || disabled) ? css`opacity: 0.2;` : ""}
  ${({isButton, disabled}) => (isButton && !disabled) ? css`
    border-color: ${COLOURS.WHITE.STANDARD};
    box-shadow: 0 0 16px ${COLOURS.WHITE.STANDARD};
    &:hover,
    &:focus {
      box-shadow: 0 0 32px ${COLOURS.WHITE.STANDARD};
    }
` : ''}
  ${({ isActive }) => isActive && css`
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
  font-size: 24px;
  font-family: sans-serif;
`;

export const Effect = ({ effect, isActive = false, disabled = false, isButton = false }: IProps) => {
  let symbol = "?";

  if (effect) {
    symbol = effect.name.substr(0, 2);
  }

  return (
    <StyledEffectWrap locked={effect === null} isActive={isActive} isButton={isButton} disabled={disabled}>
      <StyledEffectInner>{symbol}</StyledEffectInner>
    </StyledEffectWrap>
  );
};
