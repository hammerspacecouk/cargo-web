import * as React from "react";
import MessageInfo from "../Molecules/Messages/MessageInfo/MessageInfo";

interface EnabledPropsInterface {
  route: string;
}

interface PropsInterface extends EnabledPropsInterface {
  canDelete: boolean;
}

const Enabled = ({ route }: EnabledPropsInterface) => (
  <a className="button button--soft-danger" href={route}>
    Delete account
  </a>
);

const Disabled = () => (
  <>
    <MessageInfo>
      To protect against abuse, accounts cannot be deleted immediately after
      creation. Please try again later (won't be long).
    </MessageInfo>
    <button className="button button--soft-danger" disabled>
      Delete account
    </button>
  </>
);

export default (props: PropsInterface) => {
  return (
    <div>
      {props.canDelete ? <Enabled route={props.route} /> : <Disabled />}
    </div>
  );
};
