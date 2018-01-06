import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

import {PATH_LIST as portsListPath, Port} from "../../../Domain/Port";

import * as PortActions from "../../../Actions/Port/Actions";
import {StateInterface} from "../../../State/index";
import Loading from "../../../Components/Loading";
import {APIClientInterface} from "../../../Data/API/index";

interface RouteParams {
    portId: string;
}

interface Props {
    match: {
        params: RouteParams;
    };
    port: Port;
    dispatch: Dispatch<any>;
    apiClient: APIClientInterface;
}

class Container extends React.Component<Props, undefined> {
    componentDidMount() {
        PortActions.fetchSingle(this.props.match.params.portId, this.props.apiClient, this.props.dispatch);
    }

    render() {
        let port = null;
        // todo - 404: use PortFetched state?
        if (this.props.port) {
            port = (
                <div className="t-doc__main">
                    <h1>{this.props.port.name}</h1>
                    <p>{this.props.port.id}</p>
                </div>
            );
        }

        return (
            <div className="t-doc">
                <Loading>
                    {port}
                </Loading>
            </div>
        )
    }
}

export default connect(
    (state: StateInterface) => ({
        apiClient: state.environment.apiClient,
        port: state.ports.port
    })
)(Container);
