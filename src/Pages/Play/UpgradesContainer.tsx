import * as React from "react";
import EnsureLoggedIn from "../../Containers/Login/EnsureLoggedIn";
import {
  getAvailableUpgrades,
  ShipUpgradeInterface,
  UpgradesResponseInterface,
  makeUpgradePurchase
} from "../../Models/Player";
import Error from "../../components/Error/Error";
import { ErrorResponseInterface } from "../../util/HttpClient";
import Loading from "../../components/Navigation/Loading";
import TokenButton from "../../Containers/Button/TokenButton";
import CreditsButton from "../../Containers/Button/CreditsButton";
import ActionTokenInterface from "../../interfaces/ActionTokenInterface";
import { SessionContext } from "../../context/SessionContext";
import ScoreInterface from "../../interfaces/ScoreInterface";
import MessageInterface from "../../interfaces/MessageInterface";
import { Message } from "../../components/Panel/Messages";

interface StateInterface {
  data?: UpgradesResponseInterface;
  loading: boolean;
  error?: ErrorResponseInterface;
  disabledButtons: boolean;
  message?: MessageInterface;
}

interface PropsInterface {
  updateScoreHandler: (newScore: ScoreInterface) => void;
}

class UpgradesContainer extends React.Component<
  PropsInterface,
  StateInterface
> {
  constructor(props: PropsInterface) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: null,
      disabledButtons: false,
      message: null
    };
  }

  async componentDidMount() {
    try {
      const data = await getAvailableUpgrades();
      this.setState({
        data,
        loading: false
      });
    } catch (e) {
      console.error(e);
      this.setState({ error: e, loading: false });
    }
  }

  render() {
    return <EnsureLoggedIn>{this.renderPage()}</EnsureLoggedIn>;
  }

  makePurchase = async (token: ActionTokenInterface) => {
    this.setState({
      disabledButtons: true
    });

    //make the API call
    try {
      const data = await makeUpgradePurchase(token);

      // update the state
      this.setState({
        data,
        message: data.message
      });

      // update the score
      this.props.updateScoreHandler(data.newScore);
    } catch (e) {
      // todo - error handling
    } finally {
      this.setState({
        disabledButtons: false
      });
    }
  };

  renderShip = (ship?: ShipUpgradeInterface) => {
    if (!ship) {
      return "LOCKED"; // todo - design this
    }

    // todo - show the ship strengths. show the svg
    return (
      <div className="text--center">
        <h3>
          {ship.detail.name} ({ship.currentCount})
        </h3>
        <p>{ship.detail.description}</p>
        <p>Capacity: {ship.detail.capacity}</p>
        <TokenButton
          token={ship.actionToken}
          handler={(token: ActionTokenInterface) => this.makePurchase(token)}
        >
          <CreditsButton
            amount={ship.cost}
            disabled={this.state.disabledButtons}
          />
        </TokenButton>
      </div>
    );
  };

  renderPage = () => {
    if (this.state.error) {
      return (
        <Error
          code={this.state.error.statusCode}
          message={this.state.error.message}
        />
      );
    }
    if (this.state.loading) {
      return <Loading />;
    }

    const message = this.state.message && (
      <Message message={this.state.message} />
    );

    return (
      <main className="t-play__content-contain">
        <h1>The Yard</h1>

        {message}
        <h2>Ships</h2>

        <SessionContext.Consumer>
          {({ updateScore }) => (
            <ul>
              {this.state.data.ships.map((ship?: ShipUpgradeInterface) => (
                <li>{this.renderShip(ship)}</li>
              ))}
            </ul>
          )}
        </SessionContext.Consumer>
      </main>
    );
  };
}

export default () => (
  <SessionContext.Consumer>
    {({ updateScore }) => (
      <UpgradesContainer updateScoreHandler={updateScore} />
    )}
  </SessionContext.Consumer>
);
