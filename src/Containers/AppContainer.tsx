import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {withRouter} from 'react-router';

import AppView from '../Views/Pages/AppView';
import * as ScoreActions from "../Actions/ScoreActions";
import {Score} from "../Domain/Score";
import {StateInterface} from "../State/index";

interface Props {
    score: Score;
    dispatch: Dispatch<any>;
}

class Container extends React.Component<Props, undefined> {
    render() {
        return <AppView score={this.props.score}
                        onIncrease={() => ScoreActions.increase(this.props.dispatch)}
                        onDecrease={() => ScoreActions.decrease(this.props.dispatch)}
        />;
    }
}

export default withRouter(connect(
    (state: StateInterface) => ({
        score: state.score
    })
)(Container));