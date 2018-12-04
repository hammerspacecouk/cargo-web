import * as React from "react";
import MessageInterface from "../../../../interfaces/MessageInterface";
import MessageError from "../MessageError/MessageError";
import MessageWarning from "../MessageWarning/MessageWarning";
import MessageOk from "../MessageOk/MessageOk";
import MessageInfo from "../MessageInfo/MessageInfo";
import { TYPE_ERROR, TYPE_INFO, TYPE_OK, TYPE_WARNING } from "../index";

export interface GenericMessageProps {
  /** The message object to render */
  readonly message: MessageInterface;
}

export default function GenericMessage({ message }: GenericMessageProps) {
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
