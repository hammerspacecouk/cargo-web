import * as React from "react";
import styled from "styled-components";
import { IChildrenProps } from "../../../Interfaces";
import { GRID } from "../../../styles/variables";

const StyledButtonRow = styled.div`
  > * {
    display: inline-block;
    &:not(:first-child) {
      margin-left: ${GRID.UNIT};
    }
  }
`;

export const ButtonRow = ({ children }: IChildrenProps) => {
  return <StyledButtonRow>{children}</StyledButtonRow>;
};
