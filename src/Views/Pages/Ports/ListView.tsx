import * as React from 'react';
import {Link} from "react-router-dom";
import {PATH_SHOW, Port} from "../../../Domain/Port";
import Loading from "../../Components/Loading";

interface Props {
    ports? : Port[];
}

export default (props: Props) => {
    let list = null;
    if (!!props.ports) {
        list = (
            <ul>{props.ports.map((port: Port, index: number) => {
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
};
