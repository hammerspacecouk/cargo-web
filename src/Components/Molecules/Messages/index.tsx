import * as React from "react";
import styled from "styled-components";
import { GRID } from "../../../styles/variables";
import { COLOURS } from "../../../styles/colours";

// these are not using Symbol() because messages can come from the server
export const TYPE_OK = "ok";
export const TYPE_WARNING = "warning";
export const TYPE_ERROR = "error";
export const TYPE_INFO = "info";

export interface SingleProps {
  /** Child elements inside the message area */
  readonly children: any;
}

const iconSize = 32;

export const StyledMessage = styled.div`
  background: ${COLOURS.SEMANTIC.INFO.BACKGROUND};
  color: ${COLOURS.SEMANTIC.INFO.FOREGROUND};
  margin-bottom: ${GRID.UNIT};
  padding: 0;
  display: flex;
`;
const StyledIcon = styled.div`
  padding: ${GRID.UNIT};
  line-height: 0;
  width: calc(${iconSize}px + ${GRID.DOUBLE});
`;
const StyledIconImage = styled.div`
  width: ${iconSize}px;
  height: ${iconSize}px;
`;
const MessageText = styled.div`
  padding: ${GRID.HALF} ${GRID.UNIT};
  flex: 1;
  font-weight: bold;
  display: flex;
  align-items: center;
  line-height: 1.2;
`;

export const messageContent = (icon: any, children: any) => (
  <React.Fragment>
    <StyledIcon>
      <StyledIconImage>{icon}</StyledIconImage>
    </StyledIcon>
    <MessageText>
      <div>{children}</div>
    </MessageText>
  </React.Fragment>
);
