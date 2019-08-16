import { H4 } from "../Atoms/Heading";
import * as React from "react";
import { IEffect, IRank } from "../../interfaces";
import styled from "styled-components";
import { EffectSymbol } from "../Atoms/EffectSymbol";
import { GRID } from "../../styles/variables";
import { TextWarning } from "../Atoms/Text";

interface IProps {
  effect: IEffect;
  currentCount?: number;
  className?: string;
  altDescription?: React.ReactNode;
}

const StyledEffectDetail = styled.div`
  display: flex;
  align-items: center;
`;
const StyledEffectDescription = styled.div`
  margin-left: ${GRID.UNIT};
  flex: 1;
`;

export const EffectDetail = React.memo(({ effect, currentCount, altDescription, className }: IProps) => (
  <StyledEffectDetail className={className}>
    <EffectSymbol effect={effect} currentCount={currentCount} />
    <StyledEffectDescription>
      <H4 as="h3">{effect.name}</H4>
      {altDescription || altDescription === null ? altDescription : <p>{effect.description}</p>}
    </StyledEffectDescription>
  </StyledEffectDetail>
));

export const LockedEffectDetail = ({minimumRank}: {minimumRank: IRank}) => (
  <StyledEffectDetail>
    <EffectSymbol />
    <StyledEffectDescription>
      <H4 as="p"><TextWarning>Requires: {minimumRank.title}</TextWarning></H4>
    </StyledEffectDescription>
  </StyledEffectDetail>
);
