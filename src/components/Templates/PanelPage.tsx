import * as React from "react";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { H1 } from "@src/components/Atoms/Heading";
import { COLOURS } from "@src/styles/colours";
import { BREAKPOINTS } from "@src/styles/media";

export const PanelPage = (props: IProps) => (
  <StyledPage>
    <StyledInner>
      <StyledTitle>{props.title}</StyledTitle>
      {props.children}
    </StyledInner>
  </StyledPage>
);

interface IProps {
  readonly title: string;
  readonly children: any;
}

const StyledPage = styled.div`
  ${BREAKPOINTS.L`
    padding: ${GRID.DOUBLE};
  `};
`;

const StyledInner = styled.div`
  background: ${COLOURS.BLACK.STANDARD};
  padding: ${GRID.UNIT};
  ${BREAKPOINTS.XL`
    padding: ${GRID.DOUBLE};
  `};
`;

const StyledTitle = styled(H1)`
  margin-bottom: ${GRID.UNIT};
`;
