import * as React from 'react';
import { Link } from 'react-router-dom';

import { PortInterface } from '../../models/Port';
import Loading from '../../components/Loading';

import { Services } from '../../DI';

interface Params {
    portId: string;
}

interface Props {
    match: {
        params: Params;
    };
    staticContext: {
        initialData?: PortInterface;
    };
}

interface State {
    port?: PortInterface;
}

export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        super();

        let port: PortInterface;

        if (typeof window !== 'undefined') {
            port = (window as any).__DATA;
            delete (window as any).__DATA;
        } else if (props.staticContext.initialData) {
            port = props.staticContext.initialData;
        }

        // todo - 404s if ID didn't exist

        this.state = { port };
    }

    async componentDidMount() {
        if (!this.state.port) {
            let port: PortInterface = await Component.requestInitialData(this.props.match.params);
            this.setState({
                port
            });
        }
    }

    static requestInitialData(routeParams: Params) {
        return Services.ports.getById(routeParams.portId);
    }

    render() {
        let port = null;
        if (this.state.port) {
           port = (
               <div>
                   <h1>{this.state.port.name}</h1>
                   <p>{this.state.port.id}</p>
               </div>
           );
        }

        return (
            <div>
                <ol className="breadcrumbs">
                    <li className="breadcrumbs__item"><Link to="/ports" className="breadcrumbs__link">Ports</Link></li>
                </ol>
                <Loading>
                    {port}
                </Loading>
            </div>
        )
    }
}
