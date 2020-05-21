import * as React from "react";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { PANEL_BORDER } from "@src/styles/colours";
import { IChildrenProps } from "@src/interfaces";
import { ReactNode } from "react";
import { H1 } from "@src/components/Atoms/Heading";

export const PlayBoardLayout = ({ title, overview, children }: IProps) => {
  let overviewContent;
  if (overview) {
    overviewContent = <StyledOverview>{overview}</StyledOverview>;
  } else if (title) {
    overviewContent = (
      <TitleOverview>
        <H1>{title}</H1>
      </TitleOverview>
    );
  }

  return (
    <StyledPlayBoard>
      {overviewContent}
      <Page>{children}</Page>
    </StyledPlayBoard>
  );
};

interface IProps extends IChildrenProps {
  title?: string;
  overview?: ReactNode;
}

const StyledPlayBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Page = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const StyledOverview = styled.div`
  display: block;
  min-height: 300px;
  padding: ${GRID.UNIT};
  position: relative;
  overflow: hidden;
  border-bottom: ${PANEL_BORDER};
`;

const TitleOverview = styled(StyledOverview)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
