import * as React from "react";
import { IChildrenProps } from "../../interfaces";
import styled, { css } from "styled-components";
import { H6 } from "../Atoms/Heading";
import { COLOURS } from "../../styles/colours";
import { GRID } from "../../styles/variables";
import { ListInline } from "../Atoms/List/ListInline";

export enum TITLE_POSITION {
  TOP,
  BOTTOM,
}

interface IProps extends IChildrenProps {
  title: string;
  titlePosition: TITLE_POSITION;
}

const topTitleStyle = css`
  bottom: 100%;
  left: 0;
  border-right: solid 1px ${COLOURS.GREY.DARKER};
`;

const bottomTitleStyle = css`
  top: 100%;
  right: 1px;
  border-left: solid 1px ${COLOURS.GREY.DARKER};
`;

const Heading = styled(H6)<{ titlePosition: TITLE_POSITION }>`
  position: absolute;
  padding: ${GRID.HALF};
  text-transform: uppercase;
  background: ${COLOURS.GREY.BLACK};
  border-bottom: solid 1px ${COLOURS.GREY.DARKER};
  border-top: solid 1px ${COLOURS.GREY.DARKER};

  ${({ titlePosition }) => (titlePosition === TITLE_POSITION.TOP ? topTitleStyle : bottomTitleStyle)}
`;

const StyledWrapper = styled.div`
  position: relative;
`;

const List = styled(ListInline)`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  height: 100%;
  min-height: 112px;
  > li {
    vertical-align: top;
    border-right: solid 1px ${COLOURS.GREY.DARKER};
    height: 100%;
    width: 160px;
    > * {
      height: 100%;
    }
  }
`;

export const CratesList = React.memo(({ title, titlePosition, children }: IProps) => {
  const crates = React.Children.toArray(children);

  return (
    <StyledWrapper>
      <Heading as="h3" titlePosition={titlePosition}>
        {title}
      </Heading>
      <List>
        {crates.map((crate, i) => (
          <li key={`crate-${i}`}>{crate}</li>
        ))}
      </List>
    </StyledWrapper>
  );
});
