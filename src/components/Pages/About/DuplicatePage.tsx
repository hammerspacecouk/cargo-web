import * as React from "react";

import { Prose } from "../../Atoms/Prose";
import { MessageInfo } from "../../Molecules/Message";
import { LogOutButton } from "../../Organisms/LogOutButton";
import { AboutLayout } from "../../Templates/AboutLayout";
import { routes } from "../../../routes";
import { H2 } from "../../Atoms/Heading";

export const DuplicatePage = () => (
  <AboutLayout title="Duplicate account">
    <Prose>
      <p>
        You have tried to associate your account with an third party account which has already been registered. You have
        two options:
      </p>
      <H2>1. Use this account</H2>
      <p>
        To use <strong>this</strong> account as your preferred account, you will first need to delete your previous
        account which is linked to this third party provider. To do this, login to the other account and visit the{" "}
        <a href={routes.getDeleteAccount()}>Delete</a> page, or{" "}
        <a href={routes.getPlayHome()}>unlink this third party provider.</a>
      </p>
      <MessageInfo>
        You should use an Incognito/Private window to login to your other account so that you do not lose this login.
      </MessageInfo>
      <p>
        Once the other account has been deleted or unlinked, you will be able to link this account to that provider on
        your <a href={routes.getPlayHome()}>Profile</a> page.
      </p>

      <H2>2. Use your other account</H2>
      <p>
        To use your other account, you will first have to log out of this account. You will then be able to log in to
        your registered account using the standard methods on the <a href={routes.getLogin()}>Login</a> page. If this
        account is anonymous you will never be able to use it again once you log out.
      </p>
      <LogOutButton isAnonymous={false} />
    </Prose>
  </AboutLayout>
);
