import * as React from "react";
import styled from "styled-components";
import { GRID } from "../../styles/variables";
import { H2 } from "../Atoms/Heading";
import { IChildrenProps } from "../../interfaces";
import { MONOSPACE_FONT, SIZES } from "../../styles/typography";
import { CloseIcon } from "../Icons/CloseIcon";

export const Panel = React.memo(({ id, className, closeHandler, title, children, full }: IProps) => {
  let closeButton;
  if (closeHandler) {
    closeButton = (
      <Close onClick={closeHandler}>
        <CloseIcon />
      </Close>
    );
  }

  return (
    <StyledPanel className={className} id={id}>
      <PanelHeader>
        <PanelTitle>{title}</PanelTitle>
        {closeButton}
      </PanelHeader>
      <PanelBody full={full}>{children}</PanelBody>
      <PanelFoot>/{title}</PanelFoot>
    </StyledPanel>
  );
});


interface IProps extends IChildrenProps {
  id?: string;
  title: string;
  className?: string;
  full?: boolean;
  closeHandler?: () => void;
}

const StyledPanel = styled.div`
  padding: ${GRID.UNIT};
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PanelTitle = styled(H2)`
  margin-bottom: ${GRID.UNIT};
  line-height: 1;
`;

const PanelBody = styled.div<{ full: boolean }>`
  flex: 1;
  ${({ full }) => full && `margin: 0 -${GRID.UNIT}`}
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


// todo - combine with modal close?
const Close = styled.button`
  height: 32px;
  width: 32px;
  background: none;
  border: none;
  padding: 0;
  margin-left: ${GRID.UNIT};
`;
