import * as React from "react";
import ActionTokenInterface from "../../interfaces/ActionTokenInterface";
import { ApiClient } from "../../util/ApiClient";

interface Props {
  readonly token: ActionTokenInterface;
  readonly children: any;
  readonly handler?: (token: ActionTokenInterface) => Promise<void> | null;
}

class TokenButton extends React.Component<Props, undefined> {
  onSubmit(e: Event) {
    if (this.props.handler) {
      e.preventDefault();
      this.props.handler(this.props.token);
    }
  }

  render() {
    return (
      <form
        method="post"
        className="form form--inline"
        action={ApiClient.getUrl(this.props.token.path)}
        onSubmit={this.onSubmit.bind(this)}
      >
        <input type="hidden" name="token" value={this.props.token.token} />
        {this.props.children}
      </form>
    );
  }
}

export default TokenButton;
