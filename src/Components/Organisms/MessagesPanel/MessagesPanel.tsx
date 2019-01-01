import * as React from "react";
import { MessageInterface } from "../../../Interfaces";
import { Message } from "../../Molecules/Message/Message";
import { Hidden } from "../../Atoms/Hidden/Hidden";
import ListUnstyled from "../../Atoms/Lists/ListUnstyled/ListUnstyled";

export interface ListsProps {
  readonly messages?: MessageInterface[];
}

export const MessagesPanel = ({ messages }: ListsProps) => {
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
      <Hidden as="h2">Messages</Hidden>
      <ListUnstyled>{items}</ListUnstyled>
    </React.Fragment>
  );
};
