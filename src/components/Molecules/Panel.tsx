import * as React from "react";
import styled from "styled-components";
import { GRID, Z_INDEX } from "@src/styles/variables";
import { H2 } from "@src/components/Atoms/Heading";
import { IChildrenProps } from "@src/interfaces";
import { MONOSPACE_FONT, SIZES } from "@src/styles/typography";
import { PanelClose } from "@src/components/Atoms/PanelClose";
import { COLOURS, hexToRGBa, panelBackground } from "@src/styles/colours";

export const Panel = React.memo(({ id, isEvents, className, closeHandler, title, children }: IProps) => {
  let closeButton;
  if (closeHandler) {
    closeButton = <PanelClose onClick={closeHandler} />;
  }

  return (
    <StyledPanel className={className} id={id} isEvents={isEvents}>
      <StickyHeader>
        <PanelHeader isEvents={isEvents}>
          <PanelTitle>{title}</PanelTitle>
          {closeButton}
        </PanelHeader>
      </StickyHeader>
      <PanelBody>{children}</PanelBody>
      <PanelFoot>/{title}</PanelFoot>
    </StyledPanel>
  );
});

interface IProps extends IChildrenProps {
  id?: string;
  title: string;
  className?: string;
  isEvents?: boolean;
  closeHandler?: () => void;
}

const StyledPanel = styled.div<{ isEvents?: boolean }>`
  ${panelBackground};
  ${({ isEvents }) => isEvents && `background: ${COLOURS.BLACK.FULL};`};
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StickyHeader = styled.div`
  background-color: ${hexToRGBa(COLOURS.GREY.DARKEST, 0.95)};
  position: sticky;
  top: 0;
  z-index: ${Z_INDEX.DEFAULT};
`;

const PanelHeader = styled.div<{ isEvents?: boolean }>`
  ${panelBackground};
  ${({ isEvents }) => isEvents && `background: ${COLOURS.BLACK.FULL};`};
  display: flex;
  justify-content: space-between;
  padding: ${GRID.UNIT};
`;

const PanelTitle = styled(H2)`
  line-height: 1;
`;

const PanelBody = styled.div`
  flex: 1;
  padding: ${GRID.HALF} ${GRID.UNIT};
`;

const PanelFoot = styled.div`
  ${SIZES.F}
  ${MONOSPACE_FONT};
  opacity: 0.6;
  text-align: right;
  font-style: italic;
  text-transform: uppercase;
  margin: ${GRID.UNIT};
`;
