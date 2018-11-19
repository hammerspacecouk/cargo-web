import * as React from "react";
import MessageInterface from "../../interfaces/MessageInterface";
import GenericMessage from "../Molecules/Messages/GenericMessage/GenericMessage";

export interface ListsProps {
  readonly messages?: MessageInterface[];
}

export default ({ messages }: ListsProps) => {
  if (!messages || messages.length < 1) {
    return null;
  }

  const items: React.ReactElement<HTMLLIElement>[] = [];
  messages.forEach((message: MessageInterface, index) => {
    items.push(
      <li key={index} className="m-message-wrap">
        <GenericMessage message={message} />
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
