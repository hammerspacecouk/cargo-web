import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {StateInterface} from "../../../State";
import {APIClientInterface} from "../../../Data/API";
import ShipInterface from "../../../DomainInterfaces/ShipInterface";
import {calculateHexPoints, Point} from "../../../Helpers/Hexagons";

interface Props {
    match: {
        params: {
            shipId: string;
        };
    };
    ship: ShipInterface;
    loaded: boolean;
    isInPort: boolean;
    isInChannel: boolean;
    dispatch: Dispatch<any>;
    apiClient: APIClientInterface;
}

class Container extends React.Component<Props, undefined> {

    renderHexagons() {
        const width = 100;
        const height = width / (Math.sqrt(3) / 2);

        const patternWidth = width;
        const patternHeight = height * 1.5;

        const hexes = [
            calculateHexPoints(width, new Point(0, 0)),
            calculateHexPoints(width, new Point(width, 0)),
            calculateHexPoints(width, new Point(width / 2, height * 0.75)),
            calculateHexPoints(width, new Point(0, height * 1.5)),
            calculateHexPoints(width, new Point(width, height * 1.5)),
        ];

        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
                <g className="hex-grid">
                    <defs>
                        <style>{`.hex-grid polygon {fill:transparent; stroke-width: 2px;stroke:hsl(0, 1%, 72%)}`}</style>
                        <pattern id="grid-pattern" height={patternHeight} width={patternWidth} patternUnits="userSpaceOnUse">
                            {hexes.map((hex, i) => (
                                <polygon key={i} points={hex.map(
                                    (hexPoint: Point) => hexPoint.getString()
                                ).join(' ')} />
                            )) }
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </g>
            </svg>
        );
    }

    render() {
        return (
            <main>
                {this.renderHexagons()}
            </main>
        );
    }
}

export default connect(
    (state: StateInterface) => ({
        apiClient: state.environment.apiClient,
        ship: state.play.ship,
        loaded: !state.play.fetching,
        isInPort: !!state.play.currentPort,
        isInChannel: !!state.play.currentChannel,
    })
)(Container);
