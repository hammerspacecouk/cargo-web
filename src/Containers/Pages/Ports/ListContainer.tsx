import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

import * as PortActions from "../../../Actions/PortActions";
import View from '../../../Views/Pages/Ports/ListView';
import {Port} from "../../../Domain/Port";
import {StateInterface} from "../../../State/index";

interface Props {
    ports: Port[];
    dispatch: Dispatch<any>;
}

class Container extends React.Component<Props, undefined> {

    componentDidMount() {
        PortActions.fetchList(this.props.dispatch);
    }

    render() {
        return <View ports={this.props.ports} />;
    }
}

export default connect(
    (state: StateInterface) => ({
        ports: state.ports.ports
    })
)(Container);

