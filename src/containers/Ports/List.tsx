import * as React from 'react';
import { Link } from 'react-router-dom';

export interface State {
    ports: object[];
}

// todo - move this somewhere it can be shared
export interface Port {
    id: string,
    name: string
}

export default class Component extends React.Component<undefined, State> {
    constructor() {
        super();
        this.state = {
            ports: []
        }
    }

    componentDidMount() {
        // todo - abstract API calls, to sort withCredentials, and to get hostname from ENV. use DI container
        fetch('http://api.dev.planetcargo.live/ports')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    ports: responseJson.items,
                });
            })
            .catch((error) => {
                // todo - show 500
                console.error(error);
            });
    }

    render() {
        return (
            <div>
                <h1>LIST OF PORTS</h1>
                <ul>{this.state.ports.map((port: Port, index) => {
                    const path = '/ports/' + port.id;
                    return (
                        <li key={index}><Link to={path}>{port.name}</Link></li>
                    );
                })}</ul>
            </div>
        )
    }
};
