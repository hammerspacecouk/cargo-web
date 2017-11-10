import * as React from 'react';
import LoginForm from '../containers/LoginForm';
import Status from './Status';
import Loading from './Loading';

interface Props {
    loading?: boolean;
    children: any;
}

export default (props: Props) => {
    if (props.children) {
        return props.children;
    }

    if (props.loading) {
        return <Loading />
    }

    return (
        <Status code={403}>
            <h1>We need to identify you</h1>
            <LoginForm />
        </Status>
    )
};
