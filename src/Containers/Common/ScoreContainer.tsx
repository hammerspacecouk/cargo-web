import * as React from 'react';

import {Score} from "../../Domain/Score";

interface Props {
    score: Score;
}

interface State {
    digits: string[];
    rate: string;
    effectClass: string;
}

export default class extends React.Component<Props, State> {

    public props: Props;
    public state: State;
    private allowAnimationUpdate: boolean;

    constructor(props: Props) {
        super();
        this.allowAnimationUpdate = false;
        this.state = this.calculateScoreState(props.score);
    }

    formatNumber(input: number): string[] {
        let output = input.toFixed(0);

        // minimum 5 digits
        output = output.padStart(5, '0');
        return output.split('');
    }

    calculateScoreState(score: Score): State {
        const value = score.getValue(new Date());
        const rate = score.changeRate;
        let effectClass = '';

        if (rate < 0 && value <= 0) {
            effectClass = 'score--dead';
        }

        return {
            digits: this.formatNumber(value),
            rate: rate.toString(),
            effectClass
        };
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

        // @todo - special effects when it gets low
        // @todo - handle what happens when you hit zero to "kill" the player

        this.setState(this.calculateScoreState(this.props.score));
        window.requestAnimationFrame(() => this.updateScore());
    }

    render() {
        return (
            <div className={`score ${this.state.effectClass}`} data-rate={this.state.rate}>
                {this.state.digits.map((digit, i) => {
                    return (
                        <span className="score__digit" key={i}>{digit}</span>
                    );
                })}
            </div>
        );
    }
}
