import styled from "styled-components";
import { colours, grid } from "../../../GlobalStyle";
import * as React from "react";

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
  background: ${colours.blue[1]};
  color: ${colours.blue[9]};
  border: 1px solid ${colours.blue[7]};
  margin-bottom: ${grid.unit}px;
  padding: 0;
  display: flex;
`;
const StyledIcon = styled.div`
  padding: ${grid.unit}px;
  line-height: 0;
  width: ${iconSize + (2 * grid.unit)}px;
`;
const StyledIconImage = styled.div`
  width: ${iconSize}px;
  height: ${iconSize}px;
`;
const MessageText = styled.div`
  padding: ${grid.unit / 2}px ${grid.unit}px;
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
