import * as React from 'react';
import { connect } from 'react-redux';
import View from '../../../Views/Pages/Home/IndexView';

class Container extends React.Component<undefined, undefined> {
    render() {
        return <View />;
    }
}

export default connect()(Container);
