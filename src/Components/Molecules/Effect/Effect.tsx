import * as React from "react";
import styled from "styled-components";
import { IEffect } from "../../../Interfaces";
import { NumberBadge } from "../../Atoms/NumberBadge/NumberBadge";

interface IProps {
  readonly effect?: IEffect;
  readonly count?: number;
}

const All = styled.div`
  position: relative;
`;

const StyledEffectWrap = styled.div<{ locked: boolean }>`
  width: 100%;
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
  ${({ locked }) => locked && "opacity: 0.2;"}
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

const BadgePosition = styled.div`
    position: absolute;
    top: -16px;
    right: 0;
`;

export const Effect = ({ effect, count }: IProps) => {
  let symbol = "?";
  let countElement = null;

  if (effect) {
    symbol = effect.name.substr(0, 2);
    if (count) {
      countElement = (
        <BadgePosition>
          <NumberBadge value={count}/>
        </BadgePosition>
      );
    }
  }

  return (
    <All>
      <StyledEffectWrap locked={effect === null}>
        <StyledEffectInner>{symbol}</StyledEffectInner>
      </StyledEffectWrap>
      {countElement}
    </All>
  );
};
