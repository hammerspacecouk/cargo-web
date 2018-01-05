import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

import * as PortActions from "../../../Actions/Port/Actions";
import {Port} from "../../../Domain/Port";
import {StateInterface} from "../../../State/index";
import Loading from "../../../Components/Loading";
import {Link} from "react-router-dom";

interface Props {
    // ports: Port[];
    // dispatch: Dispatch<any>;
}

class Container extends React.Component<Props, undefined> {

    componentDidMount() {
        // PortActions.fetchList(this.props.dispatch);
    }

    render() {
        return (
            <div>
            <h1>LIST</h1>
            <p><Link to="/ports/678">GO</Link></p>
            <h2>TODO - NOT THE FULL LIST. JUST SHOW SOME OF THE MOST RECENT PORT ACTIVITY</h2>
            </div>
    );

        // let list = null;
        // if (!!this.props.ports) {
        //     list = (
        //         <ul>{this.props.ports.map((port: Port, index: number) => {
        //             return (
        //                 <li key={index}><Link to={PATH_SHOW(port.id)}>{port.name}</Link></li>
        //             );
        //         })}</ul>
        //     );
        // }
        // return (
        //     <Loading>
        //         {list}
        //     </Loading>
        // );
    }
}

export default connect(
    // (state: StateInterface) => ({
    //     ports: state.ports.listedPorts
    // })
)(Container);

