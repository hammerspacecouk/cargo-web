import * as React from "react";
import { IMessage } from "../../interfaces";
import { Hidden } from "../Atoms/Hidden";
import { ListUnstyled } from "../Atoms/List/ListUnstyled";
import { Message } from "../Molecules/Message";

export interface IListsProps {
  readonly messages?: IMessage[];
}

export const MessagesPanel = ({ messages }: IListsProps) => {
  if (!messages || messages.length < 1) {
    return null;
  }

  const items: Array<React.ReactElement<HTMLLIElement>> = [];
  messages.forEach((message: IMessage, index) => {
    items.push(
      <li key={index} className="m-message-wrap">
        <Message message={message} />
      </li>
    );
  });
  return (
    <React.Fragment>
      <Hidden as="h2">Messages</Hidden>
      <ListUnstyled>{items}</ListUnstyled>
    </React.Fragment>
  );
};