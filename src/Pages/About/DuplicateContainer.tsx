import * as React from "react";

import AboutLayout from "../../Components/Layout/AboutLayout";
import LogOutButtonContainer from "../../Containers/Profile/LogOutButtonContainer";
import { MessageInfo } from "../../Components/Panel/Messages";

class DuplicateContainer extends React.Component<undefined, undefined> {
  render() {
    return (
      <AboutLayout title="Duplicate account">
        <div className="text--prose">
          <p>
            You have tried to associate your anonymous account with an e-mail
            address which has already been registered. You have two options:
          </p>
          <h2>1. Register this anonymous account</h2>
          <p>
            To use <strong>this</strong> account as your preferred account, you
            will first need to delete your previous account which is linked to
            that e-mail address. To do this, login to the other account and
            visit the <a href="/profile/delete">Delete</a> page.
          </p>
          <MessageInfo>
            You should use an Incognito/Private window to login to your other
            account so that you do not lose this anonymous account.
          </MessageInfo>
          <p>
            Once the other account has been deleted, you will be able to
            register this account to that e-mail address on your{" "}
            <a href="/profile">Profile</a> page.
          </p>

          <h2>2. Use your already registered account</h2>
          <p>
            To use your other account, you will first have to log out of this
            anonymous account. You will then be able to log in to your
            registered account using the standard methods on the{" "}
            <a href="/login">Login</a> page
          </p>
        </div>
        <LogOutButtonContainer isAnonymous={true} />
      </AboutLayout>
    );
  }
}

export default DuplicateContainer;
