import * as React from 'react';
import Status from '../Status';

export default () => (
    <Status code={404}>
        <div className="error">
            <h1 className="error__title">404</h1>
            <p className="error__message">This page was not found. Please check the address and try again.</p>
        </div>
    </Status>
);