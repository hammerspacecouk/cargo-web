import * as React from 'react';

interface Props {
    children?: any;
}

export default (props: Props) => {
    if (props.children) {
        return props.children;
    }

    return (
        <div className="loading">
            <svg className="loading__spinner" xmlns="http://www.w3.org/2000/svg">
                <circle className="loading__path" fill="none" strokeWidth="4" cx="14" cy="14" r="10" />
            </svg>
        </div>
    )
};
