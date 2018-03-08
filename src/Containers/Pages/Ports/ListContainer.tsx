import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

import * as PortActions from "../../../Actions/Port/Actions";
import {StateInterface} from "../../../State";
import Loading from "../../../Components/Loading";
import {Link} from "react-router-dom";
import {APIClientInterface} from "../../../Data/API";
import Error from "../../../Components/Error/Error";
import PortInterface, {PATH_SHOW} from "../../../DomainInterfaces/PortInterface";
import CrumbTitle from "../../../Components/CrumbTitle";

interface Props {
    ports: PortInterface[];
    listLoaded: boolean;
    apiClient: APIClientInterface;
    dispatch: Dispatch<any>;
}

class Container extends React.Component<Props, undefined> {

    componentDidMount() {
        PortActions.fetchList(this.props.apiClient, this.props.dispatch);
    }

    render() {
        let ports = null;

        if (this.props.ports) {
            ports = (
                <ul>{this.props.ports.map((port: PortInterface, index: number) => {
                    return (
                        <li key={index}><Link to={PATH_SHOW(port.id)}>{port.name}</Link></li>
                    );
                })}</ul>
            );
        } else {
            ports = this.props.listLoaded ? <Error /> : <Loading />;
        }

        return (
            <div className="t-doc">
                <div className="t-doc__title">
                    <CrumbTitle>
                        Ports
                    </CrumbTitle>
                </div>
                <div className="t-doc__main">
                    {ports}
                </div>
            </div>
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
