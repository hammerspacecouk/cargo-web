import * as React from 'react';
import RequireLogin from '../../components/RequireLogin';
import PlayContainer from '../../containers/Play';

import { Services } from '../../DI';
import { UserInterface } from "../../models/User";

interface Play {

}

interface Props {
    staticContext: {
        initialData?: Play;
        user?: UserInterface;
    };
}

interface State {
    play?: Play;
}

export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        super();

        let play: Play;

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
            let play: Play = await Component.requestInitialData();
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
            playContainer = <PlayContainer />;
        }
        return (
            <RequireLogin loading={this.state.play === undefined}>
                {playContainer}
            </RequireLogin>
        )
    }
}
