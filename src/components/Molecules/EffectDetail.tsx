import { H4 } from "@src/components/Atoms/Heading";
import * as React from "react";
import { IEffect } from "@src/interfaces";
import styled from "styled-components";
import { EffectSymbol } from "@src/components/Atoms/EffectSymbol";
import { GRID } from "@src/styles/variables";

export const EffectDetail = React.memo(({ effect, currentCount, altDescription, className }: IProps) => (
  <div className={className}>
    <StyledEffectSymbol effect={effect} currentCount={currentCount} />
    <Title as="h3">{effect.name}</Title>
    {altDescription || altDescription === null ? altDescription : <p>{effect.description}</p>}
  </div>
));

interface IProps {
  effect: IEffect;
  currentCount?: number;
  className?: string;
  altDescription?: React.ReactNode;
}

const StyledEffectSymbol = styled(EffectSymbol)`
  margin: 0 auto ${GRID.HALF};
`;

const Title = styled(H4)`
  margin-bottom: ${GRID.HALF};
`;
