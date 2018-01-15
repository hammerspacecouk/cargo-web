import * as React from 'react';
import LoginForm from '../Containers/Common/LoginFormContainer';
import Status from './Status';

export default () => {
    return (
        <Status code={403}>
            <div className="t-doc">
                <h1 className="t-doc__title">You must login to do this</h1>
                <div className="t-doc__main">
                    <LoginForm />
                </div>
            </div>
        </Status>
    )
};
