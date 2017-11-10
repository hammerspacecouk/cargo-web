import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import routes from '../../Application/Routes';
import {Score} from "../../Domain/Score";
import ScoreContainer from "../../Containers/Common/ScoreContainer";

interface PropsInterface {
    score: Score;
    onIncrease: () => void;
    onDecrease: () => void;
}

export default (props: PropsInterface) => {
    return (
        <div>
            <ScoreContainer score={props.score}/>
            <p><button onClick={props.onIncrease}>UP</button> <button onClick={props.onDecrease}>DOWN</button></p>

            <p><Link to="/">HOME</Link> | <Link to="/ports">PORTS</Link></p>
            <Switch>
                {routes.map((route: object, i: number) => <Route key={i} {...route} />)}
            </Switch>
        </div>
    );
};
