import * as React from 'react';

import { Port } from './List';

export interface Props {
    match: {
        params: {
            portId: string;
        }
    };
}

export interface State {
    port?: Port;
}

export default class Component extends React.Component<Props, State> {
    constructor() {
        super();
        this.state = {
            port: null
        }
    }

    componentDidMount() {
        // todo - abstract API calls, to sort withCredentials, and to get hostname from ENV. use DI container
        fetch('http://api.dev.planetcargo.live/ports/' + this.props.match.params.portId)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    port: responseJson,
                });
            })
            .catch((error) => {
                // todo - show 500
                console.error(error);
            });
    }


    render() {
        if (!this.state.port) {
            return null;
        }

        return (
            <div>
                <h1>{this.state.port.name}</h1>
                <p>{this.state.port.id}</p>
            </div>
        )
    }
}
