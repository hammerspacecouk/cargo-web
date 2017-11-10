import * as React from 'react';
import Status from '../Status';

export default () => (
    <Status code={404}>
        <div>
            <h1>404</h1>
            <p>This page was not found. Please check the address and try again.</p>
        </div>
    </Status>
);