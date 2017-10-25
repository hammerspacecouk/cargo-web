import * as React from 'react';
import {DirectionInterface, DirectionsInterface} from "../../models/Play";

interface Props {
    shipName: string;
    portName: string;
    actionPath: string;
    directions: DirectionsInterface;
}

const renderDirection = (dir: string, dirData: DirectionInterface) => {
    let destination = null;
    if (dirData) {
        // todo - abstract time format to a helper
        const time: string[] = [];
        let minutes: number = dirData.journeyTimeMinutes;

        const hours = Math.floor(minutes / 60);
        if (hours > 0) {
            time.push(`${hours}h`);
        }
        minutes = minutes - (hours * 60);
        if (minutes > 0) {
            time.push(`${minutes}m`);
        }

        destination = (
            <div>
                <h4>{dirData.destination.name}</h4>
                <p>Distance: {time.join(', ')} ({dirData.distanceUnit} units)</p>
                <button type="submit" name="token" value={dirData.action.token}>Go</button>
            </div>
        );
    }

    return (
        <div className={dir}>
            <h3>{dir}</h3>
            {destination}
        </div>
    );
};

export default (props: Props) => {
    return (
        <div>
            <h1>{props.shipName}</h1>
            <h2>Current Location: {props.portName}</h2>

            <form action={`${props.actionPath}`} method="post">
                <div>
                    {renderDirection('NW', props.directions.NW)}
                    {renderDirection('NE', props.directions.NE)}
                </div>
                <div>
                    {renderDirection('W', props.directions.W)}
                    {renderDirection('E', props.directions.E)}
                </div>
                <div>
                    {renderDirection('SW', props.directions.SW)}
                    {renderDirection('SE', props.directions.SE)}
                </div>

            </form>

        </div>
    );
}
