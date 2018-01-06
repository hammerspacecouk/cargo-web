import * as React from 'react';
import LoginForm from '../Containers/Common/LoginForm';
import Status from './Status';
import Loading from './Loading';

interface Props {
    loading?: boolean;
}

export default (props: Props) => {
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
