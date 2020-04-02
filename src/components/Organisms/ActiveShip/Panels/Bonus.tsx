import * as React from "react";
import { EffectDetail } from "../../../Molecules/EffectDetail";
import { GridWrapper } from "../../../Atoms/GridWrapper";
import styled from "styled-components";
import { IEffect } from "../../../../interfaces";

export const Bonus = ({ bonusEffects }: { bonusEffects: IEffect[] }) => {
  return (
    <StyledGridWrapper as="ul">
      {bonusEffects.map((bonus) => (
        <Item key={`bonus-${bonus.id}`}>
          <EffectDetail effect={bonus} />
        </Item>
      ))}
    </StyledGridWrapper>
  );
};

const StyledGridWrapper = styled(GridWrapper)`
  justify-content: center;
`;

const Item = styled.li`
  max-width: 200px;
  text-align: center;
`;
