import * as React from "react";
import { parse as parseQueryString } from "query-string";
import Error from "../../Error/Error";
import ProfileLayout from "../../Layout/ProfileLayout";
import routes from "../../../routes";
import TokenButton from "../../Button/TokenButton";

interface PropsInterface {
  query?: string;
}

const stageTexts = [
  ``,
  `Are you aware that if you go ahead to the last screen and press the
      ‘Yes’ button, you will lose all data and your account completely?`,
  `Are you certain you understand that if you proceed and press the ‘Yes’
      button on the next screen that you will lose your game and it cannot be recovered?`,
  `All data will now be deleted and you will be signed out.
      Press ‘Yes’ to proceed.`
];

export default function DeletePage({ query }: PropsInterface) {
  const queryData = parseQueryString(query);
  const stage = parseInt(queryData.stage || 1);
  if (stage < 1 || stage > 3) {
    return <Error code={400} message="Invalid stage provided" />;
  }
  const stageText = stageTexts[stage];
  const token = {
    path: "/profile/delete",
    token: queryData.token || ""
  };

  return (
    <ProfileLayout title="Delete account">
      <div className="text--prose">
        <h2>{stage}/3</h2>
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
