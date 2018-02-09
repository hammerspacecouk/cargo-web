import * as React from 'react';
import MessageInterface from "../DomainInterfaces/MessageInterface";

export interface Props {
    messages?: MessageInterface[];
}

export default (props: Props) => {
    if (!props.messages || props.messages.length < 1) {
        return null;
    }

    const items: React.ReactElement<HTMLLIElement>[] = [];
    props.messages.forEach((message: MessageInterface, index) => {
        items.push(
            <li key={index}
                className={`messages__message messages__message--${message.type}`}>
                {message.message}
            </li>
        );
    });
    return (
        <ul className="messages">{items}</ul>
    );
};
