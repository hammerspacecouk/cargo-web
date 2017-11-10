import * as React from 'react';
import Status from '../Status';

export interface ErrorProps {
    code: number,
    message?: string
}

export default (props: ErrorProps) => {

    const msg = props.message || 'An error occurred. Sorry about that';

    return (
        <Status code={props.code}>
            <div>
                <h1>{props.code}</h1>
                <p>{msg}</p>
            </div>
        </Status>
    );
};
