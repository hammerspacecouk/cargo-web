import * as React from "react";
import { ActionButton } from "../../Atoms/Button/Button";
import { MessageInfo } from "../Message/Message";

interface IEnabledProps {
  route: string;
}

interface IProps extends IEnabledProps {
  canDelete: boolean;
}

const Enabled = ({ route }: IEnabledProps) => (
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
    <ActionButton disabled={true}>Delete account</ActionButton>
  </>
);

export const DeleteAccountButton = (props: IProps) => {
  return (
    <div>
      {props.canDelete ? <Enabled route={props.route} /> : <Disabled />}
    </div>
  );
};
