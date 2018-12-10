import * as React from "react";
import styled from "styled-components";
import { ChildrenPropsInterface } from "../../../interfaces/PropsInterface";
import { GRID } from "../../../styles/variables";

const StyledButtonRow = styled.div`
  > * {
    display: inline-block;
    &:not(:first-child) {
      margin-left: ${GRID.UNIT};
    }
  }
`;

export default function ButtonRow({ children }: ChildrenPropsInterface) {
  return <StyledButtonRow>{children}</StyledButtonRow>;
}
