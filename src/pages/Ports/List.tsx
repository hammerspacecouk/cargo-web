import * as React from 'react';
import { Link } from 'react-router-dom';

import { Port } from '../../models/Port';
import DI from '../../DI';

export interface Props {
    staticContext: {
        initialData?: Port[];
    };
}

export interface State {
    ports: Port[];
}

export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        super();

        let ports: Port[] = [];

        if (typeof window !== 'undefined') {
            ports = (window as any).__DATA;
            delete (window as any).__DATA;
        } else if (props.staticContext.initialData) {
            ports = props.staticContext.initialData;
        }

        this.state = { ports };
    }

    async componentDidMount() {
        if (!this.state.ports) {
            let ports = await Component.requestInitialData();
            this.setState({
                ports
            });
        }
    }

    static requestInitialData(routeParams: object = null) {
        return DI.models.getPorts().getAll();
    }

    render() {
        if (!this.state.ports) {
            return (
                <p>LOADING</p>
            );
        }

        return (
            <div>
                <h1>LIST OF PORTS</h1>
                <ul>{this.state.ports.map((port: Port, index: number) => {
                    const path = '/ports/' + port.id;
                    return (
                        <li key={index}><Link to={path}>{port.name}</Link></li>
                    );
                })}</ul>
            </div>
        )
    }
};
