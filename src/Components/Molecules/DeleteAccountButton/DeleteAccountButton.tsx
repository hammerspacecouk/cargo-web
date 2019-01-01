import * as React from "react";
import { MessageInfo } from "../Message/Message";
import { ActionButton } from "../../Atoms/Button/Button";

interface EnabledPropsInterface {
  route: string;
}

interface PropsInterface extends EnabledPropsInterface {
  canDelete: boolean;
}

const Enabled = ({ route }: EnabledPropsInterface) => (
  <ActionButton as="a" href={route}>
    Delete account
  </ActionButton>
);

const Disabled = () => (
  <>
    <MessageInfo>
      To protect against abuse, accounts cannot be deleted immediately after
      creation. Please try again later (won't be long).
    </MessageInfo>
    <ActionButton disabled>
      Delete account
    </ActionButton>
  </>
);

export const DeleteAccountButton = (props: PropsInterface) => {
  return (
    <div>
      {props.canDelete ? <Enabled route={props.route} /> : <Disabled />}
    </div>
  );
};
