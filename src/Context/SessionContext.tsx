import * as React from "react";

import PlayerInterface from "../DomainInterfaces/PlayerInterface";
import RankStatusInterface from "../DomainInterfaces/RankStatusInterface";
import ScoreInterface from "../DomainInterfaces/ScoreInterface";
import { getSession, SessionResponseInterface } from "../Models/Session";
import Modal from "../Components/Panel/Modal";
import ActionTokenInterface from "../DomainInterfaces/ActionTokenInterface";
import TokenButton from "../Containers/Button/TokenButton";
import PromotionContainer from "../Containers/Player/PromotionContainer";
import Loading from "../Components/Navigation/Loading";
import { acknowledgePromotion } from "../Models/Player";

interface PropsInterface {
  children: any;
}

interface SessionPropertiesInterface {
  player?: PlayerInterface;
  rankStatus?: RankStatusInterface;
  score?: ScoreInterface;
  playerFetched: boolean;
  hasProfileNotification: boolean;
  acknowledgingPromotion: boolean;
}

export interface SessionContextInterface extends SessionPropertiesInterface {
  updateScore: (newScore: ScoreInterface) => void;
  updateRankStatus: (newRankStatus: RankStatusInterface) => void;
  setSession: (session: SessionResponseInterface) => void;
}

export const initialSession: SessionPropertiesInterface = {
  player: null,
  score: null,
  playerFetched: false,
  hasProfileNotification: false,
  acknowledgingPromotion: false
};

export const SessionContext = React.createContext({
  ...initialSession,
  updateScore: (newScore: ScoreInterface) => {},
  updateRankStatus: (newRankStatus: RankStatusInterface) => {},
  setSession: (session: SessionResponseInterface) => {}
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
      updateScore: this.updateScore,
      updateRankStatus: this.updateRankStatus,
      setSession: this.setSession
    };
  }

  componentDidMount() {
    this.allowUpdate = true;
    this.refreshSession();
  }

  componentWillUnmount() {
    this.allowUpdate = false;
  }

  setSession = (session: SessionResponseInterface) => {
    if (session.isLoggedIn) {
      this.setState({
        playerFetched: true,
        player: session.player,
        rankStatus: session.rankStatus,
        score: session.player.score,
        hasProfileNotification: session.hasProfileNotification
      });
    } else {
      this.setState({
        playerFetched: true,
        player: null,
        rankStatus: null,
        score: null
      });
    }
  };

  refreshSession = async (allowNewPlayer?: boolean) => {
    if (!this.allowUpdate && !allowNewPlayer) {
      return;
    }

    // todo - store an update time in the session prop and don't bother refetching if it is recent
    try {
      this.setSession(await getSession());
      window.setTimeout(() => this.refreshSession(), this.sessionRefreshTime);
    } catch (e) {
      // todo - error handling
    }
  };

  updateScore = (score: ScoreInterface) => {
    this.setState({ score });
  };

  updateRankStatus = (rankStatus: RankStatusInterface) => {
    this.setState({ rankStatus });
  };

  acknowledgePromotion = async (token: ActionTokenInterface) => {
    this.setState({
      acknowledgingPromotion: true
    });

    //make the API call
    try {
      const data = await acknowledgePromotion(token);
      this.setState({
        acknowledgingPromotion: false
      });
      // Updating rankStatus should remove the token and thus close the modal
      this.updateRankStatus(data.rankStatus);
    } catch (e) {
      this.setState({
        acknowledgingPromotion: true
      });
    }
  };

  getPromotionModal = (): JSX.Element => {
    if (!this.state.rankStatus || !this.state.rankStatus.acknowledgeToken) {
      return null;
    }
    let button;
    if (this.state.acknowledgingPromotion) {
      button = (
        <button className="button" type="submit" disabled>
          <Loading />
        </button>
      );
    } else {
      button = (
        <button className="button" type="submit">
          Ok
        </button>
      );
    }

    return (
      <Modal isOpen={true} title="Promotion">
        <PromotionContainer rankStatus={this.state.rankStatus} />
        <div className="text--center">
          <TokenButton
            token={this.state.rankStatus.acknowledgeToken}
            handler={this.acknowledgePromotion}
          >
            {button}
          </TokenButton>
        </div>
      </Modal>
    );
  };

  render = () => {
    return (
      <SessionContext.Provider value={this.state}>
        {this.props.children}
        {this.getPromotionModal()}
      </SessionContext.Provider>
    );
  }
}

export default SessionContextComponent;
