import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

import * as PortActions from "../../../Actions/Port/Actions";
import {Port, PATH_SHOW} from "../../../Domain/Port";
import {StateInterface} from "../../../State/index";
import Loading from "../../../Components/Loading";
import {Link} from "react-router-dom";
import {APIClientInterface} from "../../../Data/API/index";
import Error from "../../../Components/Error/Error";

interface Props {
    ports: Port[];
    listLoaded: boolean;
    apiClient: APIClientInterface;
    dispatch: Dispatch<any>;
}

class Container extends React.Component<Props, undefined> {

    componentDidMount() {
        PortActions.fetchList(this.props.apiClient, this.props.dispatch);
    }

    render() {
        if (!this.props.ports) {
            return this.props.listLoaded ? <Error /> : <Loading />;
        }

        return (
            <ul>{this.props.ports.map((port: Port, index: number) => {
                return (
                    <li key={index}><Link to={PATH_SHOW(port.id)}>{port.name}</Link></li>
                );
            })}</ul>
        );
    }
}

export default connect(
    (state: StateInterface) => ({
        apiClient: state.environment.apiClient,
        ports: state.ports.listedPorts,
        listLoaded : !state.ports.fetchingList
    })
)(Container);
