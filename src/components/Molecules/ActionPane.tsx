import React from "react";
import styled from "styled-components";
import { COLOURS } from "../../styles/colours";
import { GRID } from "../../styles/variables";

export const ActionPaneDetail = styled.div`
  width: 100%;
  flex: 1;
  &:not(:last-child) {
    margin-bottom: ${GRID.UNIT};
  }
`;

export const ActionPaneLine = styled.div`
  &:not(:last-child) {
    margin-bottom: ${GRID.HALF};
  }
`;

export const ActionPaneButton = styled.div`
  display: flex;
  justify-content: center;
`;

export const ActionPane = styled.div<{ highlightColor?: string; disabled?: boolean }>`
  position: relative;
  padding: ${GRID.UNIT} ${GRID.HALF};
  border: solid 1px ${COLOURS.GREY.BLACK};
  background: ${COLOURS.GREY.DARKEST};
  border-radius: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
  border-top-color: ${COLOURS.GREY.DARK};
  ${({ highlightColor }) => highlightColor && `border-top-color: ${highlightColor};`}
  ${({ disabled }) => disabled && `opacity: 0.4;`}
`;
