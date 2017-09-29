import * as React from 'react';

import NotFound from '../../components/Error/NotFound';
import GeneralError from '../../components/Error/Error';

export default class Error extends React.Component<undefined, undefined> {
    render() {
        const type = 404; // todo - calculations about the error, and send back the status code

        if (type === 404) {
            return <NotFound/>;
        }

        return <GeneralError />;
    }
}
