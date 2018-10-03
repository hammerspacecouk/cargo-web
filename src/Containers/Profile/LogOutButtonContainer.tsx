import * as React from "react";
import routes from "../../routes";
import { MessageWarning } from "../../Components/Panel/Messages";

interface Props {
  readonly isAnonymous: boolean;
}

interface LocalState {
}


export default class LogOutButtonContainer extends React.Component<Props, LocalState> {
  render() {
    let warning = null;
    if (this.props.isAnonymous) {
      warning = (
        <MessageWarning>
          Your account is currently anonymous. If you logout, you will
          never be able to continue your game.
        </MessageWarning>
      );
    }

    return (
      <div>
        {warning}
        <a className="button" href={routes.getLogout()}>
          Logout
        </a>
      </div>
    );
  }
}
