import * as React from 'react';

import { Port } from '../../models/Port';
import DI from '../../DI';

interface Params {
    portId: string;
}

interface Props {
    match: {
        params: Params;
    };
    staticContext: {
        initialData?: Port;
    };
}

interface State {
    port?: Port;
}

export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        super();

        let port: Port;

        if (typeof window !== 'undefined') {
            port = (window as any).__DATA;
            delete (window as any).__DATA;
        } else if (props.staticContext.initialData) {
            port = props.staticContext.initialData;
        }

        this.state = { port };
    }

    async componentDidMount() {
        if (!this.state.port) {
            let port: Port = await Component.requestInitialData(this.props.match.params);
            this.setState({
                port
            });
        }
    }

    static requestInitialData(routeParams: Params = null) {
        return DI.models.getPorts().getById(routeParams.portId);
    }


    render() {
        if (!this.state.port) {
            return (
                <p>LOADING</p>
            );
        }

        return (
            <div>
                <h1>{this.state.port.name}</h1>
                <p>{this.state.port.id}</p>
            </div>
        )
    }
}
