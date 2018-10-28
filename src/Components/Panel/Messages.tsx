import * as React from "react";
import MessageInterface from "../../interfaces/MessageInterface";
import TickIcon from "../Icons/TickIcon";
import WarningIcon from "../Icons/WarningIcon";
import InfoIcon from "../Icons/InfoIcon";
import ErrorIcon from "../Icons/ErrorIcon";

// these are not using Symbol() because messages can come from the server
export const TYPE_OK = "ok";
export const TYPE_WARNING = "warning";
export const TYPE_ERROR = "error";
export const TYPE_INFO = "info";

export interface ListsProps {
  readonly messages?: MessageInterface[];
}

export interface GenericMessageProps {
  readonly message: MessageInterface;
}

export interface SingleProps {
  readonly children: any;
}

const genericMessage = (icon: any, type: string, children: any) => (
  <div className={`m-message m-message--${type}`}>
    <div className="m-message__icon">
      <div className="m-message__icon-img">{icon}</div>
    </div>
    <div className="m-message__text">
      <div>{children}</div>
    </div>
  </div>
);

export const MessageError = (props: SingleProps) =>
  genericMessage(<ErrorIcon />, TYPE_ERROR, props.children);
export const MessageWarning = (props: SingleProps) =>
  genericMessage(<WarningIcon />, TYPE_WARNING, props.children);
export const MessageOk = (props: SingleProps) =>
  genericMessage(<TickIcon />, TYPE_OK, props.children);
export const MessageInfo = (props: SingleProps) =>
  genericMessage(<InfoIcon />, TYPE_INFO, props.children);

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

export default ({ messages }: ListsProps) => {
  if (!messages || messages.length < 1) {
    return null;
  }

  const items: React.ReactElement<HTMLLIElement>[] = [];
  messages.forEach((message: MessageInterface, index) => {
    items.push(
      <li key={index} className="m-message-wrap">
        <Message message={message} />
      </li>
    );
  });
  return (
    <React.Fragment>
      <h2 className="hidden">Messages</h2>
      <ul className="list--unstyled">{items}</ul>
    </React.Fragment>
  );
};
