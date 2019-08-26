import * as React from "react";
import styled from "styled-components";
import { GRID } from "../../styles/variables";
import { H1 } from "../Atoms/Heading";
import { COLOURS } from "../../styles/colours";

export const PanelPage = (props: IProps) => (
  <StyledPage>
    <StyledTitle>{props.title}</StyledTitle>
    {props.children}
  </StyledPage>
);

interface IProps {
  readonly title: string;
  readonly children: any;
}

const StyledPage = styled.div`
  background: ${COLOURS.BLACK.STANDARD};
  padding: ${GRID.DOUBLE};
`;

const StyledTitle = styled(H1)`
  margin-bottom: ${GRID.UNIT};
`;
