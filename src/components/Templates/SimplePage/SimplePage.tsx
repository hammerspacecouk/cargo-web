import * as React from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../styles/media";
import { GRID, MAX_CONTENT_WIDTH } from "../../../styles/variables";
import { CrumbTitle, ICrumb } from "../../Molecules/CrumbTitle/CrumbTitle";

interface IProps {
  readonly title: string;
  readonly children: any;
  readonly crumbs?: ICrumb[];
}

const StyledPage = styled.div`
  display: grid;
  grid-template-columns: [edge-left] 0 [main] calc(100% - ${GRID.DOUBLE}) 0 [edge-right];
  grid-gap: ${GRID.UNIT};
  ${BREAKPOINTS.XXL`
      grid-template-columns: [edge-left] 1fr [main] calc(${MAX_CONTENT_WIDTH} - ${GRID.DOUBLE}) 1fr [edge-right];
    `}
`;

const StyledTitle = styled.div`
  grid-column: edge-left / edge-right;
  > * {
    margin: 0 auto;
    max-width: ${MAX_CONTENT_WIDTH};
    padding: ${GRID.DOUBLE} ${GRID.UNIT};
  }
`;

const StyledMain = styled.div`
  grid-column: main;
`;

export const SimplePage = (props: IProps) => (
  <StyledPage>
    <StyledTitle>
      <CrumbTitle crumbs={props.crumbs}>{props.title}</CrumbTitle>
    </StyledTitle>
    <StyledMain>{props.children}</StyledMain>
  </StyledPage>
);
