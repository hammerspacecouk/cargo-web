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
import { cacheGet, cacheSet, cacheRemove } from "../Utils/StorageCache";

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
  refreshSession: () => void;
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
  updateScore: (newScore: ScoreInterface) => {
  },
  updateRankStatus: (newRankStatus: RankStatusInterface) => {
  },
  setSession: (session: SessionResponseInterface) => {
  },
  refreshSession: () => {
  }
});

class SessionContextComponent extends React.Component<PropsInterface,
  SessionContextInterface> {
  private localStorageKey = "CARGO_SESSION_CONTEXT";
  private sessionRefreshTime: number = 1000 * 60 * 2;
  private allowUpdate: boolean = false;
  private lastFetched?: number = null;

  constructor(props: any) {
    super(props);
    this.state = {
      ...initialSession,
      updateScore: this.updateScore,
      updateRankStatus: this.updateRankStatus,
      setSession: this.setSession,
      refreshSession: this.refreshSession
    };
  }

  componentDidMount() {
    this.allowUpdate = true;
    if (window.location.hash === "#logout") {
      cacheRemove(this.localStorageKey);
    }
    const data = cacheGet(this.localStorageKey);
    if (data) {
      this.setState({ ...data });
    } else {
      this.setEmpty(false);
    }
    window.setTimeout(this.refreshTick, this.sessionRefreshTime);
  }

  componentWillUnmount() {
    this.allowUpdate = false;
  }

  setEmpty = (fetched: boolean = true) => {
    this.setState({
      playerFetched: fetched,
      player: null,
      rankStatus: null,
      score: null
    });
  };

  setSession = (session: SessionResponseInterface) => {
    this.lastFetched = Date.now();
    if (session.isLoggedIn) {
      this.setState({
        playerFetched: true,
        player: session.player,
        rankStatus: session.rankStatus,
        score: session.player.score,
        hasProfileNotification: session.hasProfileNotification
      });
    } else {
      this.setEmpty();
    }
    cacheSet(
      this.localStorageKey,
      {
        playerFetched: this.state.playerFetched,
        player: this.state.player,
        rankStatus: this.state.rankStatus,
        score: this.state.score,
        hasProfileNotification: this.state.hasProfileNotification
      }
    );
  };

  refreshSession = async () => {
    try {
      this.setSession(await getSession());
    } catch (e) {
      // if we failed to fetch a session, perform one reload
      console.error(e);
      const hashCheck = "#err";
      if (window.location.hash !== hashCheck) {
        window.location.hash = hashCheck;
        window.location.reload();
      } else {
        // todo - throw again
      }
    }
  };

  refreshTick = () => {
    if (!this.allowUpdate) {
      return;
    }
    // don't fetch if we recently fetched
    if (!this.lastFetched || this.lastFetched < (Date.now() - (30 * 1000))) {
      // don't fetch if we're in a background tab
      if (!document.hidden) {
        this.refreshSession();
      }
    }
    window.setTimeout(this.refreshTick, this.sessionRefreshTime);
  };

  updateScore = (score: ScoreInterface) => {
    this.setState({ score });
    this.lastFetched = Date.now();
  };

  updateRankStatus = (rankStatus: RankStatusInterface) => {
    this.setState({ rankStatus });
    this.lastFetched = Date.now();
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
          <Loading/>
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
        <PromotionContainer rankStatus={this.state.rankStatus}/>
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
  };
}

export default SessionContextComponent;
