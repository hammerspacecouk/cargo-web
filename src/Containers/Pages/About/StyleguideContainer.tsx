import * as React from 'react';
import { connect } from 'react-redux';
import {calculateHexPoints, Point} from "../../../Helpers/Hexagons";

class Container extends React.Component<undefined, undefined> {
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
            <svg xmlns="http://www.w3.org/2000/svg" width="300px" viewBox="0 0 600 600">
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
            <div className="t-doc">
                <div className="t-doc__main">
                    <div className="text--prose">
                    <h1>Styleguide</h1>
                    <p>
                        This is a collection of elements to demonstrate the overall design of the application.
                    </p>

                    <h2>Hexagons</h2>
                        {this.renderHexagons()}


                    <h2>Core</h2>
                    <h2>Atoms</h2>

                    <h3>Buttons</h3>

                    <p><button className="btn">Standard button</button></p>
                    <p><button className="btn btn--confirm">Confirm</button></p>
                    <p><button className="btn btn--danger">Reject</button></p>
                    <p><button className="btn btn--soft-danger">Soft Reject</button></p>


                    <h2>Molecules</h2>

                    <h3>Messages</h3>
                        <ul className="messages">
                            <li className="messages__message">Default message (info)</li>
                            <li className="messages__message messages__message--ok">Success message (ok)</li>
                            <li className="messages__message messages__message--error">Error message (error)</li>
                            <li className="messages__message messages__message--warning">Warning message (warning)</li>
                        </ul>

                    <h3>Breadcrumbs</h3>

                    <h3>Single item:</h3>
                    <ol className="breadcrumb">
                        <li className="breadcrumb__item"><a href="#" className="breadcrumb__link">Crumb one</a></li>
                    </ol>

                    <h3>Multiple items:</h3>
                    <ol className="breadcrumb">
                        <li className="breadcrumb__item"><a href="#" className="breadcrumb__link">Crumb one</a></li>
                        <li className="breadcrumb__item"><a href="#" className="breadcrumb__link">Crumb two</a></li>
                        <li className="breadcrumb__item"><a href="#" className="breadcrumb__link">Crumb three</a></li>
                        <li className="breadcrumb__item"><a href="#" className="breadcrumb__link">Crumb four</a></li>
                    </ol>

                    <h2>Organisms</h2>

                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(Container);
