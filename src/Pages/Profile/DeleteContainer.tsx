import * as React from "react";
import TokenButton from "../../Containers/Button/TokenButton";
import ActionTokenInterface from "../../DomainInterfaces/ActionTokenInterface";
import { parse as parseQueryString } from "query-string";
import { RouteProps, withRouter } from "react-router";
import Error from "../../Components/Error/Error";
import routes from "../../routes";
import withPlayer from "../../Components/withPlayer";
import { getDeleteProfileToken } from "../../Models/Session";
import ProfileLayout from "../../Components/Layout/ProfileLayout";

class DeleteContainer extends React.Component<RouteProps, undefined> {
  private stageTexts = [
    ``,
    `Are you aware that if you go ahead to the last screen and press the
      ‘Yes’ button, you will lose all data and your account completely?`,
    `Are you certain you understand that if you proceed and press the ‘Yes’
      button on the next screen that you will lose your game and it cannot be recovered?`,
    `All data will now be deleted and you will be signed out.
      Press ‘Yes’ to proceed.`
  ];

  render() {
    const query = parseQueryString(this.props.location.search);
    const stage = parseInt(query.stage || 1);
    if (stage < 1 || stage > 3) {
      return <Error code={400} message="Invalid stage provided" />;
    }

    return this.renderPage(
      stage,
      this.stageTexts[stage],
      getDeleteProfileToken(query.token || "")
    );
  }

  renderPage(
    stageNumber: number,
    stageText: string,
    token: ActionTokenInterface
  ) {
    return (
      <ProfileLayout title="Delete account">
          <div className="text--prose">
            <h2>{stageNumber}/3</h2>
            <p>{stageText}</p>
          </div>

          <div className="text--center">
            <a className="button button--confirm" href={routes.getProfile()}>
              Cancel
            </a>
            <TokenButton token={token}>
              <button type="submit" className="button button--danger">
                Yes
              </button>
            </TokenButton>
          </div>
      </ProfileLayout>
    );
  }
}

export default withPlayer(withRouter(DeleteContainer as any));
