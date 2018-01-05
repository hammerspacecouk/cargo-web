import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

import {PATH_LIST as portsListPath, Port} from "../../../Domain/Port";

import * as PortActions from "../../../Actions/Port/Actions";
import {StateInterface} from "../../../State/index";
import Loading from "../../../Components/Loading";

interface RouteParams {
    portId: string;
}

interface Props {
    match: {
        params: RouteParams;
    };
    // port: Port;
    // dispatch: Dispatch<any>;
}

class Container extends React.Component<Props, undefined> {
    componentDidMount() {
        // PortActions.fetchSingle(this.props.match.params.portId, this.props.dispatch);
    }

    render() {
        return (<h1>SHOW {this.props.match.params.portId}</h1>);

        // let port = null;
        // if (this.props.port) {
        //     port = (
        //         <div>
        //             <h1>{this.props.port.name}</h1>
        //             <p>{this.props.port.id}</p>
        //         </div>
        //     );
        // }
        //
        // return (
        //     <div>
        //         <ol className="breadcrumbs">
        //             <li className="breadcrumbs__item"><Link to={portsListPath} className="breadcrumbs__link">Ports</Link></li>
        //         </ol>
        //         <Loading>
        //             {port}
        //         </Loading>
        //     </div>
        // )
    }
}

export default connect(null, null
    // (state: StateInterface) => ({
    //     port: state.ports.port
    // })
)(Container);
