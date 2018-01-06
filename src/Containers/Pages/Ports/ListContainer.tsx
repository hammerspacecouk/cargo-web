import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

import * as PortActions from "../../../Actions/Port/Actions";
import {Port, PATH_SHOW} from "../../../Domain/Port";
import {StateInterface} from "../../../State/index";
import Loading from "../../../Components/Loading";
import {Link} from "react-router-dom";
import {APIClientInterface} from "../../../Data/API/index";

interface Props {
    ports: Port[];
    apiClient: APIClientInterface;
    dispatch: Dispatch<any>;
}

class Container extends React.Component<Props, undefined> {

    componentDidMount() {
        PortActions.fetchList(this.props.apiClient, this.props.dispatch);
    }

    render() {
        let list = null;
        if (!!this.props.ports) {
            list = (
                <ul>{this.props.ports.map((port: Port, index: number) => {
                    return (
                        <li key={index}><Link to={PATH_SHOW(port.id)}>{port.name}</Link></li>
                    );
                })}</ul>
            );
        }
        return (
            <Loading>
                {list}
            </Loading>
        );
    }
}

export default connect(
    (state: StateInterface) => ({
        apiClient: state.environment.apiClient,
        ports: state.ports.listedPorts
    })
)(Container);

