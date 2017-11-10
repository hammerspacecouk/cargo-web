import * as React from 'react';
import {Link} from "react-router-dom";
import {PATH_LIST as portsListPath, Port} from "../../../Domain/Port";
import Loading from "../../Components/Loading";

interface Props {
    port? : Port;
}

export default (props: Props) => {
    let port = null;
    if (props.port) {
        port = (
            <div>
                <h1>{props.port.name}</h1>
                <p>{props.port.id}</p>
            </div>
        );
    }

    return (
        <div>
            <ol className="breadcrumbs">
                <li className="breadcrumbs__item"><Link to={portsListPath} className="breadcrumbs__link">Ports</Link></li>
            </ol>
            <Loading>
                {port}
            </Loading>
        </div>
    )
};
