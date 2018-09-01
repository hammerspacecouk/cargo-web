import * as React from "react";

import Modal from "../../Components/Modal";
import GuestMasthead from "../../Components/Masthead/GuestMasthead";
import PlayerMasthead from "../../Components/Masthead/PlayerMasthead";
import LoginForm from "../../Components/LoginForm";
import PlayerInterface from "../../DomainInterfaces/PlayerInterface";
import ScoreInterface from "../../DomainInterfaces/ScoreInterface";
import ShipInterface from "../../DomainInterfaces/ShipInterface";
import AppMenu from "../../Components/Masthead/AppMenu";
import RankStatusInterface from "../../DomainInterfaces/RankStatusInterface";
import {
  SessionContext,
  SessionContextInterface
} from "../../Context/SessionContext";
import {
  CurrentShipContext,
  CurrentShipContextInterface
} from "../../Context/CurrentShipContext";

interface Props {
  readonly sessionPlayer?: PlayerInterface;
  readonly sessionScore?: ScoreInterface;
  readonly currentShip?: ShipInterface;
  readonly playerRankStatus?: RankStatusInterface;
  readonly playerShips?: ShipInterface[];
}

interface LocalState {
  menuOpen: boolean;
  loginModalIsOpen: boolean;
}

class MastheadContainer extends React.Component<Props, LocalState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      menuOpen: false,
      loginModalIsOpen: false
    };

    this.loginClicked = this.loginClicked.bind(this);
    this.menuButtonHandler = this.menuButtonHandler.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  loginClicked(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    this.setState({
      loginModalIsOpen: true
    });
  }

  menuButtonHandler(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    return (
      <SessionContext.Consumer>
        {sessionContext => (
          <CurrentShipContext.Consumer>
            {currentShipContext =>
              this.renderHeader(sessionContext, currentShipContext)
            }
          </CurrentShipContext.Consumer>
        )}
      </SessionContext.Consumer>
    );
  }

  renderHeader(
    sessionContext: SessionContextInterface,
    currentShipContext: CurrentShipContextInterface
  ) {
    let masthead;
    if (sessionContext.player) {
      masthead = (
        <React.Fragment>
          <PlayerMasthead
            currentShip={currentShipContext.ship}
            menuButtonHandler={this.menuButtonHandler}
            score={sessionContext.score}
          />
          <AppMenu
            isOpen={this.state.menuOpen}
            linkClicked={this.closeMenu}
            player={sessionContext.player}
            playerRankStatus={sessionContext.rankStatus}
            playerShips={sessionContext.ships}
          />
        </React.Fragment>
      );
    } else {
      masthead = (
        <React.Fragment>
          <GuestMasthead loginClicked={this.loginClicked} />
          <Modal
            title="Login"
            isOpen={this.state.loginModalIsOpen}
            onClose={() =>
              this.setState({
                loginModalIsOpen: false
              })
            }
          >
            <LoginForm />
          </Modal>
        </React.Fragment>
      );
    }

    return (
      <header className="masthead-position">
        <div>{masthead}</div>
      </header>
    );
  }
}

export default MastheadContainer;
