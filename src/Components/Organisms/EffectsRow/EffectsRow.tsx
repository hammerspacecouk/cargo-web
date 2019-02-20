import * as React from "react";
import { IChildrenProps } from "../../../Interfaces";
import styled from "styled-components";
import { ListUnstyled } from "../../Atoms/Lists/ListUnstyled/ListUnstyled";
import { GRID } from "../../../styles/variables";
import { EFFECT_WIDTH } from "../../Molecules/Effect/Effect";

const StyledRow = styled(ListUnstyled)`
  display: flex;
  margin-left: -${GRID.UNIT};
  flex-wrap: wrap;
  justify-content: flex-start;
`;
const StyledItem = styled.li`
  width: ${EFFECT_WIDTH};
  margin-left: ${GRID.UNIT};
`;

export const EffectsRow = ({ children }: IChildrenProps) => {
  return (
    <StyledRow>
      {children.map(child => (
        <StyledItem key={child.key}>{child}</StyledItem>
      ))}
    </StyledRow>
  );
};
