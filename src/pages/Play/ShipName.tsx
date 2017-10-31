import * as React from 'react';
import RequireLogin from '../../components/RequireLogin';

import {default as DI, Services} from '../../DI';
import { UserInterface } from "../../models/User";
import {PlayShipInterface} from "../../models/Play";

interface Params {
    shipId: string;
}

interface Props {
    match: {
        params: Params;
    };
    location: {
        search?: string;
    };
    staticContext: {
        initialData?: PlayShipInterface;
        user?: UserInterface;
    };
}

interface State {
    play?: PlayShipInterface;
}

export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        super();

        let play: PlayShipInterface;

        if (typeof window !== 'undefined' && (window as any).__DATA) {
            play = (window as any).__DATA;
            delete (window as any).__DATA;
        } else if (props.staticContext && props.staticContext.initialData !== undefined) {
            play = props.staticContext.initialData;
        }

        this.state = { play };
    }

    async componentDidMount() {
        if (!this.state.play) {
            const play: PlayShipInterface = await Component.requestInitialData(this.props.match.params);
            this.setState({
                play
            });
        }
    }

    static requestInitialData(params: Params, user?: UserInterface) {
        return Services.play.getForShip(params.shipId, user);
    }

    getQueryParams(query: string): any {
        const params: any = {};
        const str = query.substring(1);
        const vars = str.split('&');
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split('=');
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
        return params;
    }

    render() {
        let playContainer = null;
        let accept = null;

        if (this.state.play) {
            const requestPath = `${DI.apiHostname}/actions/request-ship-name?shipId=${this.state.play.ship.id}`;
            const acceptPath = `${DI.apiHostname}/actions/rename-ship`;

            if (this.props.location.search) {
                const params = this.getQueryParams(this.props.location.search);

                accept = (
                    <div>
                        <h2>Name offered: {params.name}</h2>
                        <form action={acceptPath} method="post">
                            <input type="hidden" name="token" value={params.token} />
                            <button type="submit">Accept name</button>
                        </form>
                    </div>
                );
            }

            // todo - this request option should use a token to prevent CSRF and to remove need for query
            // string SHIP ID
            playContainer = (
                <div>
                    <h1>{this.state.play.ship.name}</h1>
                    {accept}
                    <form action={requestPath} method="post">
                        <button type="submit">Request new name option</button>
                    </form>
                </div>
            );
        }
        return (
            <RequireLogin loading={this.state.play === undefined}>
                {playContainer}
            </RequireLogin>
        )
    }
}
