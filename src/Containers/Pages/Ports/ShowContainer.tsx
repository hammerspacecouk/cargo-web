import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

import * as PortActions from "../../../Actions/PortActions";
import View from '../../../Views/Pages/Ports/ShowView';
import {Port} from "../../../Domain/Port";
import {StateInterface} from "../../../State/index";

interface RouteParams {
    portId: string;
}

interface Props {
    match: {
        params: RouteParams;
    };
    port: Port;
    dispatch: Dispatch<any>;
}

class Container extends React.Component<Props, undefined> {
    componentDidMount() {
        PortActions.fetchSingle(this.props.match.params.portId, this.props.dispatch);
    }

    render() {
        return <View port={this.props.port} />;
    }
}

export default connect(
    (state: StateInterface) => ({
        port: state.ports.port
    })
)(Container);
