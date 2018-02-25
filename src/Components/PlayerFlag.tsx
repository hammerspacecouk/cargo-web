import * as React from 'react';
import PlayerInterface from "../DomainInterfaces/PlayerInterface";

export interface Props {
    player: PlayerInterface;
    size?: string;
}

export default (props: Props) => {
    const className = (props.size) ? `flag flag--${props.size}` : 'flag';

    return (
        <div className={className}
             style={{backgroundColor: props.player.colour}} />
    );
};
