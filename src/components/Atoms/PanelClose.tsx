import { CloseIcon } from "../Icons/CloseIcon";
import * as React from "react";
import styled from "styled-components";
import { GRID } from "../../styles/variables";
import { ButtonHTMLAttributes } from "react";

export const PanelClose = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <StyledModalClose {...props}>
    <CloseIcon />
  </StyledModalClose>
);

const StyledModalClose = styled.button`
  height: 32px;
  width: 32px;
  background: none;
  border: none;
  padding: 0;
  margin-left: ${GRID.UNIT};
`;
