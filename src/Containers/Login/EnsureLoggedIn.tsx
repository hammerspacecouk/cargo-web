import * as React from "react";
import RequireLogin from "../../Components/Login/RequireLogin";
import Loading from "../../Components/Navigation/Loading";
import { SessionContext } from "../../Context/SessionContext";
import PlayerInterface from "../../DomainInterfaces/PlayerInterface";

interface InitialPropsInterface {
  readonly children: any;
}

interface PropsInterface extends InitialPropsInterface {
  readonly player?: PlayerInterface;
  readonly playerFetched?: boolean;
  readonly children: any;
  readonly refreshSession: () => void;
}

// Client-side login check
class EnsureLoggedIn extends React.Component<PropsInterface, undefined> {
  componentDidMount() {
    if (!this.props.playerFetched) {
      this.props.refreshSession();
    }
  }

  render() {
    if (!this.props.player) {
      return this.props.playerFetched ? <RequireLogin /> : <Loading />;
    }
    return this.props.children;
  }
}

export default (props: InitialPropsInterface) => (
  <SessionContext.Consumer>
    {({ player, playerFetched, refreshSession }) => (
      <EnsureLoggedIn
        player={player}
        playerFetched={playerFetched}
        refreshSession={refreshSession}
        {...props}
      />
    )}
  </SessionContext.Consumer>
);
