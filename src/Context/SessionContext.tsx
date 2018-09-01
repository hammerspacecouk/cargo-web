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
  playerFetching: boolean;
}

export interface SessionContextInterface extends SessionPropertiesInterface {
  updateScore: (newScore: ScoreInterface) => void;
  updateRankStatus: (newRankStatus: RankStatusInterface) => void;
}

export const initialSession: SessionPropertiesInterface = {
  player: null,
  score: null,
  ships: null,
  playerFetched: false,
  playerFetching: false
};

export const SessionContext = createContext({
  ...initialSession,
  updateScore: (newScore: ScoreInterface) => {},
  updateRankStatus: (newRankStatus: RankStatusInterface) => {}
});

class SessionContextComponent extends React.Component<
  PropsInterface,
  SessionContextInterface
> {
  private sessionRefreshTime: number = 1000 * 60 * 2;
  private allowUpdate: boolean = false;

  constructor(props: any) {
    super(props);

    this.state = {
      ...initialSession,
      updateScore: this.updateScore.bind(this),
      updateRankStatus: this.updateRankStatus.bind(this)
    };
  }

  componentDidMount() {
    this.allowUpdate = true;
    this.refreshSession();
  }

  componentWillUnmount() {
    this.allowUpdate = false;
  }

  async refreshSession() {
    if (!this.allowUpdate) {
      return;
    }

    // todo - store an update time in the session prop and don't bother refetching if it is recent
    this.setState({
      playerFetching: true
    });
    try {
      const session: SessionResponseInterface = await getSession();
      if (session.loggedIn) {
        this.setState({
          playerFetching: false,
          playerFetched: true,
          player: session.player,
          rankStatus: session.player.rankStatus,
          score: session.player.score,
          ships: session.ships
        });
      } else {
        this.setState({
          playerFetching: false,
          playerFetched: true,
          player: null,
          rankStatus: null,
          score: null,
          ships: []
        });
      }
      window.setTimeout(() => this.refreshSession(), this.sessionRefreshTime);
    } catch (e) {
      this.setState({
        playerFetching: false
      });
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
