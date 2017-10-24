import * as React from 'react';

interface Props {
    destinationName: string;
    arrival: string;
}

export default (props: Props) => {
    return (
        <div>
            <h1>Travelling</h1>
            <h2>Destination: {props.destinationName}</h2>
            <h3>Arrival: {props.arrival}</h3>
        </div>
    );
}
