import * as React from 'react';
import {DirectionInterface, PlayShipInterface} from "../models/Play";
import DI from "../DI";

interface Props {
    play: PlayShipInterface;
}

export default class Component extends React.Component<Props, undefined> {

    renderDirection(dir: string, dirData: DirectionInterface)
    {
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
    }

    render() {
        // todo - make stateless component
        const play = this.props.play;

        const destinations = [];

        return (
            <div>
            <h1>{play.ship.name}</h1>
            <h2>Current Location: {play.location.name}</h2>

            <form action={`${DI.apiHostname}${play.directions.actionPath}`} method="post">
                <div>
                    {this.renderDirection('NW', play.directions.directions.NW)}
                    {this.renderDirection('NE', play.directions.directions.NE)}
                </div>
                <div>
                    {this.renderDirection('W', play.directions.directions.W)}
                    {this.renderDirection('E', play.directions.directions.E)}
                </div>
                <div>
                    {this.renderDirection('SW', play.directions.directions.SW)}
                    {this.renderDirection('SE', play.directions.directions.SE)}
                </div>

            </form>

            </div>
        );
    }
}
