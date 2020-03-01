import * as React from "react";
import styled from "styled-components";
import { GRID } from "../../styles/variables";
import { H1 } from "../Atoms/Heading";
import { COLOURS } from "../../styles/colours";
import { BREAKPOINTS } from "../../styles/media";

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
