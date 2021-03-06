import * as React from "react";
import styled from "styled-components";
import { IChildrenProps, IMessage } from "@src/interfaces";
import { COLOURS } from "@src/styles/colours";
import { GRID } from "@src/styles/variables";
import { ErrorIcon } from "@src/components/Icons/ErrorIcon";
import { InfoIcon } from "@src/components/Icons/InfoIcon";
import { TickIcon } from "@src/components/Icons/TickIcon";
import { WarningIcon } from "@src/components/Icons/WarningIcon";

// these are not using Symbol() because messages can come from the server
export const TYPE_OK = "ok";
export const TYPE_WARNING = "warning";
export const TYPE_ERROR = "error";
export const TYPE_INFO = "info";

const iconSize = 32;

interface IGenericMessageProps {
  /** The message object to render */
  readonly message: IMessage;
}

interface IStyledProps {
  fill: string;
  text: string;
}

const StyledMessage = styled.div<IStyledProps>`
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

const messageContent = (icon: any, children: any, color: { BACKGROUND: string; FOREGROUND: string }) => (
  <StyledMessage fill={color.BACKGROUND} text={color.FOREGROUND}>
    <StyledIcon>
      <StyledIconImage>{icon}</StyledIconImage>
    </StyledIcon>
    <MessageText>
      <div>{children}</div>
    </MessageText>
  </StyledMessage>
);

export const MessageOk = ({ children }: IChildrenProps) => messageContent(<TickIcon />, children, COLOURS.SEMANTIC.OK);
export const MessageWarning = ({ children }: IChildrenProps) =>
  messageContent(<WarningIcon />, children, COLOURS.SEMANTIC.WARNING);
export const MessageInfo = ({ children }: IChildrenProps) =>
  messageContent(<InfoIcon />, children, COLOURS.SEMANTIC.OK);
export const MessageError = ({ children }: IChildrenProps) =>
  messageContent(<ErrorIcon />, children, COLOURS.SEMANTIC.DANGER);

export const Message = React.memo(({ message }: IGenericMessageProps) => {
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
});
