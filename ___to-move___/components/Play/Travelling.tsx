import * as React from 'react';

interface Props {
    destinationName: string;
    arrival: string;
    percent: number;
}

export default (props: Props) => {
    return (
        <div>
            <h1>Travelling</h1>
            <h2>Destination: {props.destinationName}</h2>
            <h3>Arrival: {props.arrival}</h3>
            <div style={{
                width: '100%',
                background: '#666',
                height: '32px'
            }}>
                <div style={{
                    height: '32px',
                    background: '#6c6',
                    width: `${props.percent}%`
                }}></div>
            </div>
        </div>
    );
}
