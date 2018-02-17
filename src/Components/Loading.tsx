import * as React from 'react';

// todo - different types of loaders (local vs whole page)
export default () => {
    return (
        <div className="loading">
            <svg className="loading__spinner" xmlns="http://www.w3.org/2000/svg">
                <circle className="loading__path" fill="none" strokeWidth="4" cx="14" cy="14" r="10" />
            </svg>
        </div>
    )
};
