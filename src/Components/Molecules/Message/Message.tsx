import * as React from "react";
import styled from "styled-components";
import { GRID } from "../../../styles/variables";
import { COLOURS } from "../../../styles/colours";
import TickIcon from "../../Icons/TickIcon/TickIcon";
import WarningIcon from "../../Icons/WarningIcon/WarningIcon";
import InfoIcon from "../../Icons/InfoIcon/InfoIcon";
import ErrorIcon from "../../Icons/ErrorIcon/ErrorIcon";
import { ChildrenPropsInterface, MessageInterface } from "../../../Interfaces";

// these are not using Symbol() because messages can come from the server
export const TYPE_OK = "ok";
export const TYPE_WARNING = "warning";
export const TYPE_ERROR = "error";
export const TYPE_INFO = "info";

const iconSize = 32;

interface GenericMessageProps {
  /** The message object to render */
  readonly message: MessageInterface;
}

interface StyledPropsInterface {
  fill: string;
  text: string;
}

const StyledMessage = styled.div<StyledPropsInterface>`
  background: ${({ fill }) => fill};
  color: ${({ text }) => text};
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

const messageContent = (
  icon: any,
  children: any,
  color: { BACKGROUND: string; FOREGROUND: string }
) => (
  <StyledMessage fill={color.BACKGROUND} text={color.FOREGROUND}>
    <StyledIcon>
      <StyledIconImage>{icon}</StyledIconImage>
    </StyledIcon>
    <MessageText>
      <div>{children}</div>
    </MessageText>
  </StyledMessage>
);

export const MessageOk = ({ children }: ChildrenPropsInterface) =>
  messageContent(<TickIcon />, children, COLOURS.SEMANTIC.OK);
export const MessageWarning = ({ children }: ChildrenPropsInterface) =>
  messageContent(<WarningIcon />, children, COLOURS.SEMANTIC.WARNING);
export const MessageInfo = ({ children }: ChildrenPropsInterface) =>
  messageContent(<InfoIcon />, children, COLOURS.SEMANTIC.INFO);
export const MessageError = ({ children }: ChildrenPropsInterface) =>
  messageContent(<ErrorIcon />, children, COLOURS.SEMANTIC.DANGER);

export const Message = ({ message }: GenericMessageProps) => {
  switch (message.type) {
    case TYPE_OK:
      return <MessageOk>{message.message}</MessageOk>;
    case TYPE_WARNING:
      return <MessageWarning>{message.message}</MessageWarning>;
    case TYPE_ERROR:
      return <MessageError>{message.message}</MessageError>;
    case TYPE_INFO:
    default:
      return <MessageInfo>{message.message}</MessageInfo>;
  }
};
