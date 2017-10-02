import * as React from 'react';
import { Route } from 'react-router-dom';

export interface Props {
    code: number,
    children: any
}

export default (props: Props) => (
    <Route render={({ staticContext }) => {
        if (staticContext) {
            staticContext.status = props.code;
        }
        return props.children;
    }}/>
);
