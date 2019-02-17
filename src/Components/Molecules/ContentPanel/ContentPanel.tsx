import * as React from "react";
import styled from "styled-components";
import { GRID } from "../../../styles/variables";
import { COLOURS } from "../../../styles/colours";
import { ELEMENTS } from "../../../styles/typography";

interface IProps {
  panelTitle: string;
  children: JSX.Element;
}

const StyledContentPanel = styled.div<{ panelTitle: string }>`
  background: ${COLOURS.BLACK.STANDARD};
  padding: ${GRID.UNIT};
  &:after {
    content: "/${({ panelTitle }) => panelTitle}";
    ${ELEMENTS.H6};
    display: block;
    margin-top: ${GRID.UNIT};
    opacity: 0.6;
  text-align: right;
  }
`;

const Title = styled.h2`
  ${ELEMENTS.H6};
  opacity: 0.6;
  margin-bottom: ${GRID.UNIT};
`;

export const ContentPanel = ({ panelTitle, children }: IProps) => {
  return (
    <StyledContentPanel panelTitle={panelTitle}>
      <Title>{panelTitle}</Title>
      {children}
    </StyledContentPanel>
  );
};
