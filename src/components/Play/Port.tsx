import * as React from 'react';
import {DirectionsInterface} from "../../models/Play";

interface Props {
    shipName: string;
    portName: string;
    actionPath: string;
    directions: DirectionsInterface;
}

export default (props: Props) => {
    return (
        <div>
            <h1>{props.shipName}</h1>
            <h2>Current Location: {props.portName}</h2>

            <form action={`${props.actionPath}`} method="post">
                <div>
                    {this.renderDirection('NW', props.directions.NW)}
                    {this.renderDirection('NE', props.directions.NE)}
                </div>
                <div>
                    {this.renderDirection('W', props.directions.W)}
                    {this.renderDirection('E', props.directions.E)}
                </div>
                <div>
                    {this.renderDirection('SW', props.directions.SW)}
                    {this.renderDirection('SE', props.directions.SE)}
                </div>

            </form>

        </div>
    );
}
