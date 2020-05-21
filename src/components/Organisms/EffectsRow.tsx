import * as React from "react";
import styled from "styled-components";
import { ListUnstyled } from "@src/components/Atoms/List/ListUnstyled";
import { GRID } from "@src/styles/variables";
import { EFFECT_WIDTH } from "@src/components/Molecules/Effect";

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

// todo - remove the anys here
export const EffectsRow = ({ children }: { children: any }) => {
  return (
    <StyledRow>
      {children.map((child: any) => (
        <StyledItem key={child.key}>{child}</StyledItem>
      ))}
    </StyledRow>
  );
};
