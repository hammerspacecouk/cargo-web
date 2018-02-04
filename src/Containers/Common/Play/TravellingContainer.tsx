import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

interface Props {

}

class Container extends React.Component<undefined, undefined> {

    render() {
        return (
            <h1>Travelling</h1>
        );
    }
}

export default connect()(Container);