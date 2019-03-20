import * as React from "react";
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
