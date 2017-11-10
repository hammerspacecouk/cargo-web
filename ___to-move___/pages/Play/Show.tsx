import * as React from 'react';
import RequireLogin from '../../components/RequireLogin';
import PlayContainer from '../../containers/Play';

import { Services } from '../../DI';
import { UserInterface } from "../../models/User";
import {Redirect} from "react-router";
import {PlayInterface} from "../../models/Play";

interface Props {
    staticContext: {
        initialData?: PlayInterface;
        user?: UserInterface;
    };
}

interface State {
    play?: PlayInterface;
}

export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        super();

        let play: PlayInterface;

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
            const play: PlayInterface = await Component.requestInitialData();
            this.setState({
                play
            });
        }
    }

    static requestInitialData(params?: any, user?: UserInterface) {
        return Services.play.get(user);
    }

    render() {
        let playContainer = null;
        if (this.state.play) {
            const shipId = this.state.play.ships[0].id;
            let status = '';
            if (this.state.play.status === 'WELCOME') {
                status = '?welcome';
            }
            // todo - redirect to the ship with the most recent event
            return <Redirect to={`/play/ships/${shipId}${status}`} />;
        }
        return (
            <RequireLogin loading={this.state.play === undefined}>
                {playContainer}
            </RequireLogin>
        )
    }
}
