import * as React from 'react';
import ScoreContainer from "../../Containers/Common/ScoreContainer";
import {Player} from "../../Domain/Player";
import {Link} from "react-router-dom";
import {Score} from "../../Domain/Score";

interface Props {
    player: Player;
    score: Score;
}

export default (props: Props) => {
    return (
        <div className="masthead">
            <div className="masthead__logo"><Link to="/">Planet Cargo</Link> ({props.player.id})</div>
            <div className="masthead__login"><Link to="/profile">Profile</Link></div>
            <div className="masthead__score"><ScoreContainer score={props.score}/></div>
        </div>
    )
};
