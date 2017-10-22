import * as React from 'react';
import RequireLogin from '../../components/RequireLogin';
import PlayContainer from '../../containers/Play';

import { Services } from '../../DI';
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
    }
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
            let play: PlayShipInterface = await Component.requestInitialData(this.props.match.params);
            this.setState({
                play
            });
        }
    }

    static requestInitialData(params: Params, user?: UserInterface) {
        return Services.play.getForShip(params.shipId, user);
    }


    render() {
        let playContainer = null;
        let welcome = '';
        if (this.props.location.search === '?welcome') {
            welcome = 'WELCOME!'; // todo - welcome page
        }
        if (this.state.play) {
            // todo - handle travelling state
            playContainer = <PlayContainer play={this.state.play} />;
        }
        return (
            <RequireLogin loading={this.state.play === undefined}>
                {playContainer}
            </RequireLogin>
        )
    }
}
