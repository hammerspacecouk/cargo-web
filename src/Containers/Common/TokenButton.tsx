import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import ActionTokenInterface from "../../DomainInterfaces/ActionTokenInterface";
import {TokenHandlerInterface} from "../../Actions/TokenHandlerInterface";
import {StateInterface} from "../../State/index";
import {APIClientInterface} from "../../Data/API/index";

interface Props {
    readonly token: ActionTokenInterface;
    readonly children: any;
    readonly dispatch: Dispatch<any>;
    readonly apiClient: APIClientInterface;
    readonly handler: TokenHandlerInterface | null;
}

class TokenButton extends React.Component<Props, undefined> {
    onSubmit(e: Event) {
        if (this.props.handler) {
            e.preventDefault();
            this.props.handler(this.props.token, this.props.apiClient, this.props.dispatch);
        }
    }

    // todo - path needs to have the API hostname in there

    render() {
        return (
            <form method="post" action={this.props.token.path} onSubmit={this.onSubmit.bind(this)}>
                <input type="hidden" name="token" value={this.props.token.token} />
                {this.props.children}
            </form>
        );
    }
}

export default connect(
    (state: StateInterface, ownProps: any) => ({
        apiClient: state.environment.apiClient,
        token: ownProps.token,
        children: ownProps.children,
        handler: ownProps.handler || null,
    })
)(TokenButton);