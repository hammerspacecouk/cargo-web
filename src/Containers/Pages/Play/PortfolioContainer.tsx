import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {StateInterface} from "../../../State";
import {APIClientInterface} from "../../../Data/API";
import ShipInterface from "../../../DomainInterfaces/ShipInterface";

interface Props {
    match: {
        params: {
            shipId: string;
        };
    };
    ship: ShipInterface;
    loaded: boolean;
    isInPort: boolean;
    isInChannel: boolean;
    dispatch: Dispatch<any>;
    apiClient: APIClientInterface;
}

class Container extends React.Component<Props, undefined> {

    render() {
        return (
            <main className="t-play__content-contain">
                <h1>
                    PORTFOLIO
                </h1>
            </main>
        );
    }
}

export default connect(
    (state: StateInterface) => ({
        apiClient: state.environment.apiClient,
        ship: state.play.ship,
        loaded: !state.play.fetching,
        isInPort: !!state.play.currentPort,
        isInChannel: !!state.play.currentChannel,
    })
)(Container);
