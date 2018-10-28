import * as React from "react";
import RequireLogin from "../../components/Login/RequireLogin";
import Loading from "../../components/Navigation/Loading";
import { SessionContext } from "../../context/SessionContext";
import PlayerInterface from "../../interfaces/PlayerInterface";

interface InitialPropsInterface {
  readonly children: any;
}

interface PropsInterface extends InitialPropsInterface {
  readonly player?: PlayerInterface;
  readonly children: any;
  readonly refreshSession: () => void;
}

// Client-side login check
class EnsureLoggedIn extends React.Component<PropsInterface, undefined> {
  componentDidMount() {
    if (this.props.player === undefined) {
      this.props.refreshSession();
    }
  }

  render() {
    if (this.props.player === undefined) {
      return <Loading />
    }
    if (!this.props.player) {
      return <RequireLogin />;
    }
    return this.props.children;
  }
}

export default (props: InitialPropsInterface) => (
  <SessionContext.Consumer>
    {({ player, refreshSession }) => (
      <EnsureLoggedIn
        player={player}
        refreshSession={refreshSession}
        {...props}
      />
    )}
  </SessionContext.Consumer>
);
