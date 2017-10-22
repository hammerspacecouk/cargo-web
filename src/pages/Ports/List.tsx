import * as React from 'react';
import { Link } from 'react-router-dom';

import { PortInterface } from '../../models/Port';
import Loading from '../../components/Loading';

import { Services } from '../../DI';

export interface Props {
    staticContext: {
        initialData?: PortInterface[];
    };
}

export interface State {
    ports: PortInterface[];
}

export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        super();

        let ports: PortInterface[] = [];

        if (typeof window !== 'undefined') {
            ports = (window as any).__DATA;
            delete (window as any).__DATA;
        } else if (props.staticContext.initialData !== undefined) {
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

    static requestInitialData() {
        return Services.ports.getAll();
    }

    render() {
        let list = null;
        if (!!this.state.ports) {
            list = (
                <ul>{this.state.ports.map((port: PortInterface, index: number) => {
                    const path = '/ports/' + port.id;
                    return (
                        <li key={index}><Link to={path}>{port.name}</Link></li>
                    );
                })}</ul>
            );
        }

        return (
                <div>
                    <h1>LIST OF PORTS</h1>
                    <Loading>
                        {list}
                    </Loading>
                </div>
        )
    }
};
