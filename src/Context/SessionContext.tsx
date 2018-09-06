import { createContext } from "react";

import PlayerInterface from "../DomainInterfaces/PlayerInterface";
import RankStatusInterface from "../DomainInterfaces/RankStatusInterface";
import ScoreInterface from "../DomainInterfaces/ScoreInterface";
import ShipInterface from "../DomainInterfaces/ShipInterface";
import * as React from "react";
import { getSession, SessionResponseInterface } from "../Models/Session";

interface PropsInterface {
  children: any;
}

interface SessionPropertiesInterface {
  player?: PlayerInterface;
  rankStatus?: RankStatusInterface;
  score?: ScoreInterface;
  ships?: ShipInterface[];
  playerFetched: boolean;
  hasSetEmail: boolean;
}

export interface SessionContextInterface extends SessionPropertiesInterface {
  updateScore: (newScore: ScoreInterface) => void;
  updateRankStatus: (newRankStatus: RankStatusInterface) => void;
  createNewPlayer: () => void;
}

export const initialSession: SessionPropertiesInterface = {
  player: null,
  score: null,
  ships: null,
  playerFetched: false,
  hasSetEmail: false
};

export const SessionContext = createContext({
  ...initialSession,
  updateScore: (newScore: ScoreInterface) => {},
  updateRankStatus: (newRankStatus: RankStatusInterface) => {},
  createNewPlayer: () => {}
});

class SessionContextComponent extends React.Component<
  PropsInterface,
  SessionContextInterface
> {
  private sessionRefreshTime: number = 1000 * 60 * 2;
  private allowUpdate: boolean = false;

  constructor(props: any) {
    super(props);

    this.updateScore = this.updateScore.bind(this);
    this.updateRankStatus = this.updateRankStatus.bind(this);
    this.createNewPlayer = this.createNewPlayer.bind(this);

    this.state = {
      ...initialSession,
      updateScore: this.updateScore,
      updateRankStatus: this.updateRankStatus,
      createNewPlayer: this.createNewPlayer
    };
  }

  componentDidMount() {
    this.allowUpdate = true;
    this.refreshSession();
  }

  componentWillUnmount() {
    this.allowUpdate = false;
  }

  async createNewPlayer() {
    this.allowUpdate = false;
    this.setState({
      playerFetched: false
    });
    await this.refreshSession(true);
    this.allowUpdate = true;
  }

  async refreshSession(allowNewPlayer?: boolean) {
    if (!this.allowUpdate && !allowNewPlayer) {
      return;
    }

    // todo - store an update time in the session prop and don't bother refetching if it is recent
    try {
      const session: SessionResponseInterface = await getSession(
        allowNewPlayer
      );
      if (session.loggedIn) {
        this.setState({
          playerFetched: true,
          player: session.player,
          rankStatus: session.rankStatus,
          score: session.player.score,
          ships: session.ships,
          hasSetEmail: session.hasSetEmail
        });
      } else {
        this.setState({
          playerFetched: true,
          player: null,
          rankStatus: null,
          score: null,
          ships: []
        });
      }
      window.setTimeout(() => this.refreshSession(), this.sessionRefreshTime);
    } catch (e) {
      // todo - error handling
    }
  }

  updateScore(score: ScoreInterface) {
    this.setState({ score });
  }
  updateRankStatus(rankStatus: RankStatusInterface) {
    this.setState({ rankStatus });
  }

  render() {
    return (
      <SessionContext.Provider value={this.state}>
        {this.props.children}
      </SessionContext.Provider>
    );
  }
}

export default SessionContextComponent;
