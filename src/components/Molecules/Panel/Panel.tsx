import * as React from "react";
import styled from "styled-components";
import { GRID } from "../../../styles/variables";
import { H2 } from "../../Atoms/Heading/Heading";
import { IChildrenProps } from "../../../Interfaces";
import { MONOSPACE_FONT, SIZES } from "../../../styles/typography";

interface IProps extends IChildrenProps {
  title: string;
  className?: string;
}

const StyledPanel = styled.div`
  padding: ${GRID.UNIT};
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PanelTitle = styled(H2)`
  margin-bottom: ${GRID.UNIT};
  line-height: 1;
`;

const PanelBody = styled.div`
    flex: 1;
`;

const PanelFoot = styled.div`
    ${SIZES.F}
    ${MONOSPACE_FONT};
    opacity: 0.6;
    text-align: right;
    font-style: italic;
    text-transform: uppercase;
    margin-top: ${GRID.UNIT};
`;

export const Panel = ({ className, title, children }: IProps) => {
  return (
    <StyledPanel className={className}>
      <PanelTitle>{title}</PanelTitle>
      <PanelBody>
        {children}
      </PanelBody>
      <PanelFoot>/{title}</PanelFoot>
    </StyledPanel>
  )
};
