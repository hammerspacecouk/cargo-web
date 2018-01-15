import * as React from 'react';
import Status from '../Status';

export interface ErrorProps {
    code?: number,
    message?: string
}

export default (props: ErrorProps) => {

    const code = props.code || 500;
    const msg = props.message || 'An error occurred. Sorry about that';

    return (
        <Status code={code}>
            <div className="error">
                <h1 className="error__title">{code}</h1>
                <p className="error__message">{msg}</p>
            </div>
        </Status>
    );
};
