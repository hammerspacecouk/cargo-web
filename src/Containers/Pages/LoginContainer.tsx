import * as React from 'react';
import {connect} from 'react-redux';
import {RouteProps, withRouter, Redirect} from 'react-router';

import LoginFormContainer from '../Common/LoginFormContainer';
import MessageInterface from "../../DomainInterfaces/MessageInterface";

import messageQueryString from '../../Helpers/MessageQueryString';
import PlayerInterface from "../../DomainInterfaces/PlayerInterface";
import {StateInterface} from "../../State";

export interface Props {
    player?: PlayerInterface;
    messages?: MessageInterface[];
}

class Container extends React.Component<Props, undefined> {
    render() {
        if (this.props.player) {
            return <Redirect to="/play" />;
        }

        return (
            <div className="t-doc">
                <h1 className="t-doc__title">Login</h1>
                <div className="t-doc__main">
                    <LoginFormContainer messages={this.props.messages}/>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(
    (state: StateInterface, props: RouteProps) => {
        return {
            messages: messageQueryString(props.location.search),
            player: state.session.player,
        }
    },
    null
)(Container) as any);
