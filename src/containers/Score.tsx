import * as React from 'react';

import {default as ScoreModel} from '../models/Score';
import {default as ScoreComponent} from '../components/Score';

interface Props {
    score: ScoreModel;
}

interface State {
    value: string;
}

export default class Score extends React.Component<Props, State> {

    private score: ScoreModel;
    private allowAnimationUpdate: boolean;

    constructor(props: Props) {
        super();
        this.allowAnimationUpdate = false;
        this.score = props.score;
        this.state = {
            value: props.score.getValue(new Date())
        }
    }

    componentDidMount() {
        this.allowAnimationUpdate = true;
        this.updateScore();
    }

    componentWillUnmount() {
        this.allowAnimationUpdate = false;
    }

    updateScore() {
        if (!this.allowAnimationUpdate) {
            return;
        }

        const value = this.score.getValue(new Date());
        // @todo - special effects when it gets low
        // @todo - handle what happens when you hit zero to "kill" the player

        this.setState({
            value,
        });
        window.requestAnimationFrame(() => this.updateScore());
    }

    render() {
        return <ScoreComponent value={this.state.value} />;
    }
}
