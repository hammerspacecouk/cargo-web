import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

import * as PortActions from "../../../Actions/Port/Actions";
import {StateInterface} from "../../../State";
import Loading from "../../../Components/Loading";
import {APIClientInterface} from "../../../Data/API";
import NotFound from "../../../Components/Error/NotFound";
import PortInterface from "../../../DomainInterfaces/PortInterface";

interface Props {
    match: {
        params: {
            portId: string;
        };
    };
    port: PortInterface;
    portLoaded: boolean;
    dispatch: Dispatch<any>;
    apiClient: APIClientInterface;
}

class Container extends React.Component<Props, undefined> {
    componentDidMount() {
        PortActions.fetchSingle(this.props.match.params.portId, this.props.apiClient, this.props.dispatch);
    }

    render() {
        if (!this.props.port) {
            return this.props.portLoaded ? <NotFound /> : <Loading />;
        }
        return (
            <div className="t-doc">
                <div className="t-doc__main">
                    <h1>{this.props.port.name}</h1>
                    <p>{this.props.port.id}</p>
                </div>
            </div>
        )
    }
}

export default connect(
    (state: StateInterface) => ({
        apiClient: state.environment.apiClient,
        port: state.ports.port,
        portLoaded: !state.ports.fetchingPort,
    })
)(Container);
