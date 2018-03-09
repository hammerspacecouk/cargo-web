import * as React from 'react';
import {connect} from 'react-redux';

import Modal from './ModalContainer';
import GuestMasthead from '../../Components/Masthead/GuestMasthead';
import PlayerMasthead from '../../Components/Masthead/PlayerMasthead';
import {StateInterface} from "../../State";
import LoginForm from './LoginFormContainer';
import PlayerInterface from "../../DomainInterfaces/PlayerInterface";
import ScoreInterface from "../../DomainInterfaces/ScoreInterface";
import ShipInterface from "../../DomainInterfaces/ShipInterface";
import AppMenu from "../../Components/Masthead/AppMenu";
import RankStatusInterface from "../../DomainInterfaces/RankStatusInterface";

interface Props {
    readonly sessionPlayer?: PlayerInterface;
    readonly sessionScore?: ScoreInterface;
    readonly currentShip?: ShipInterface;
    readonly playerRankStatus?: RankStatusInterface;
    readonly playerShips?: ShipInterface[];
}

interface LocalState {
    menuOpen: boolean
}

class MastheadContainer extends React.Component<Props, LocalState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            menuOpen : false,
        };

        this.loginClicked = this.loginClicked.bind(this);
        this.menuButtonHandler = this.menuButtonHandler.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    refs: {
        loginModal: Modal;
    };

    loginClicked(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        this.refs.loginModal.openModal();
    }

    menuButtonHandler(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        this.setState({menuOpen: !this.state.menuOpen});
    }

    closeMenu() {
        this.setState({menuOpen: false});
    }

    render() {
        let masthead;
        if (this.props.sessionPlayer) {
            masthead = [
                <PlayerMasthead key="masthead"
                                currentShip={this.props.currentShip}
                                menuButtonHandler={this.menuButtonHandler}
                                score={this.props.sessionScore}/>,
                <AppMenu key="appMenu"
                         isOpen={this.state.menuOpen}
                         linkClicked={this.closeMenu}
                         player={this.props.sessionPlayer}
                         playerRankStatus={this.props.playerRankStatus}
                         playerShips={this.props.playerShips}
                />
            ];
        } else {
            masthead = [
                <GuestMasthead key="masthead" loginClicked={this.loginClicked}/>,
                <Modal key="modal" ref="loginModal" title="Login">
                    <LoginForm/>
                </Modal>
            ];
        }

        return (
            <header className="masthead-position">
                <div className="base-width-limit">
                {masthead}
                </div>
            </header>
        );
    }
}

export default connect(
    (state: StateInterface) => ({
        sessionPlayer: state.session.player,
        sessionScore: state.session.score,
        playerRankStatus: state.session.rankStatus,
        currentShip: state.play.ship,
        playerShips: state.session.ships,
    }),
    null
)(MastheadContainer);