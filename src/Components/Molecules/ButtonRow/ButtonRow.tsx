import * as React from "react";
import styled from "styled-components";
import { ChildrenPropsInterface } from "../../../interfaces/PropsInterface";
import { grid } from "../../../GlobalStyle";

const StyledButtonRow = styled.div`
  > * {
    display: inline-block;
    &:not(:first-child) {
        margin-left: ${grid.unit}px
    }
  }
`;

export default function ButtonRow({children}: ChildrenPropsInterface) {
  return (
    <StyledButtonRow>
      {children}
    </StyledButtonRow>
  );
}
