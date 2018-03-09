import * as React from 'react';
import {connect} from 'react-redux';
import TokenButton from "../../Common/TokenButton";
import ActionTokenInterface from "../../../DomainInterfaces/ActionTokenInterface";
import {StateInterface} from "../../../State";
import {parse as parseQueryString} from "query-string";
import {RouteProps, withRouter} from "react-router";
import CrumbTitle from "../../../Components/CrumbTitle";

interface Props {
    apiHostname: string;
    token: string;
    stage: number;
}

class DeleteContainer extends React.Component<Props, undefined> {

    private textFirst: string = `Are you aware that if you go ahead to the last screen and press the
                    ‘Yes’ button, you will lose all data and your account completely?`;
    private textSecond: string = `Are you certain you understand that if you proceed and press the ‘Yes’
                    button on the next screen that you will lose your game and it cannot be recovered?`;
    private textThird: string = `All data will now be deleted and you will be signed out.
                Press ‘Yes’ to proceed.`;

    render() {
        const token: ActionTokenInterface = {
            path: '/profile/delete',
            token: this.props.token,
        };

        let stageText;
        let stageNumber;
        switch (this.props.stage) {
            case 3:
                stageText = this.textThird;
                stageNumber = 3;
                break;
            case 2:
                stageText = this.textSecond;
                stageNumber = 2;
                break;
            case 1:
            default:
                stageText = this.textFirst;
                stageNumber = 1;
                break;
        }

        return (
            <div className="t-doc">
                <div className="t-doc__title">
                    <CrumbTitle crumbs={[{link:'/profile', title: 'Profile'}]}>
                        Delete account
                    </CrumbTitle>
                </div>
                <div className="t-doc__main">
                    <div className="text--prose">
                        <h2>{stageNumber}/3</h2>
                        <p>{stageText}</p>
                    </div>

                    <div className="text--center">
                        <a className="btn btn--confirm" href="/profile">Cancel</a>
                        <TokenButton token={token}>
                            <button type="submit" className="btn btn--danger">Yes</button>
                        </TokenButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(
    (state: StateInterface, props: RouteProps) => {
        const query = parseQueryString(props.location.search);
        return {
            token : query.token || '',
            stage : parseInt(query.stage || 1),
            apiHostname: state.environment.apiHostname,
        }
    },
    null
)(DeleteContainer) as any);
