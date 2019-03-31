import * as React from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../styles/media";
import { GRID, MAX_PANEL_WIDTH } from "../../../styles/variables";
import { H1 } from "../../Atoms/Heading/Heading";
import { COLOURS } from "../../../styles/colours";

interface IProps {
  readonly title: string;
  readonly children: any;
}

const StyledPage = styled.div`
  display: block;
  background: ${COLOURS.BLACK.STANDARD};
  margin: 0 auto;
  padding: ${GRID.UNIT};
  max-width: ${MAX_PANEL_WIDTH};
  min-height: 100vh;
  ${BREAKPOINTS.M`
    margin-top: ${GRID.DOUBLE};
    border-radius: 8px;
    min-height: unset;
  `}
`;

const StyledTitle = styled(H1)`
  margin-bottom: ${GRID.UNIT};
`;

export const PanelPage = (props: IProps) => (
  <StyledPage>
    {/*todo - logo header */}
    <StyledTitle>{props.title}</StyledTitle>
    <div>{props.children}</div>
  </StyledPage>
);
