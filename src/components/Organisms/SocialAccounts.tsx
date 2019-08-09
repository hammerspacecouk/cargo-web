import { MessageWarning } from "../Molecules/Message";
import * as React from "react";
import { GridWrapper } from "../Atoms/GridWrapper";
import styled from "styled-components";
import { Prose } from "../Atoms/Prose";
import { GRID } from "../../styles/variables";
import { Icon } from "../Atoms/Icon";
import { ReactNode } from "react";
import { AddButton, RemoveButton } from "../Atoms/Button";
import {
  AmazonLogo,
  AppleLogo,
  FacebookLogo,
  GoogleLogo,
  MicrosoftLogo,
  RedditLogo,
  TwitterLogo,
} from "../Atoms/Logos";
import { IClassNameProps } from "../../interfaces";
import { routes } from "../../routes";
import { IAuthProvider, IAuthProviders } from "../../data/profile";
import { TokenButton } from "../Molecules/TokenButton";
import { Environment } from "../../utils/environment";

export const SocialAccounts = ({ isAnonymous, authProviders, className }: IProps) => {
  // todo - prompt if you go to remove the last one
  let warning;
  if (isAnonymous) {
    warning = (
      <MessageWarning>
        You have not yet linked your game to an authentication provider. <br />
        If you clear your cookies or switch browsers you will never be able to recover your game. <br />
        Link your game now to make sure it is saved.
      </MessageWarning>
    );
  }
  return (
    <div className={className}>
      {warning}
      <Prose>
        <p>
          We recognise your account through the association with one of these authentication providers. We don't store
          or access your personal data on these platforms.{" "}
          <a href={routes.getAboutPolicies()}>Read more about your privacy</a>.
        </p>
      </Prose>
      <GridWrapper as="ul">
        {authProviders.amazon && <SocialAccount logo={<AmazonLogo />} text="Amazon" provider={authProviders.amazon} />}
        {authProviders.apple && <SocialAccount logo={<AppleLogo />} text="Apple" provider={authProviders.apple} />}
        {authProviders.facebook && (
          <SocialAccount logo={<FacebookLogo />} text="Facebook" provider={authProviders.facebook} />
        )}
        {authProviders.google && <SocialAccount logo={<GoogleLogo />} text="Google" provider={authProviders.google} />}
        {authProviders.microsoft && (
          <SocialAccount logo={<MicrosoftLogo />} text="Microsoft" provider={authProviders.microsoft} />
        )}
        {authProviders.reddit && <SocialAccount logo={<RedditLogo />} text="Reddit" provider={authProviders.reddit} />}
        {authProviders.twitter && (
          <SocialAccount logo={<TwitterLogo />} text="Twitter" provider={authProviders.twitter} />
        )}
      </GridWrapper>
    </div>
  );
};

interface IProps extends IClassNameProps {
  isAnonymous: boolean;
  authProviders: IAuthProviders;
}

const SocialAccount = ({ logo, text, provider }: ISocialAccountProps) => {
  let button;
  if (provider.removalToken) {
    button = (
      <TokenButton token={provider.removalToken}>
        <RemoveButton />
      </TokenButton>
    );
  } else {
    button = (
      <form method="post" action={`${Environment.clientApiHostname}${provider.addUrl}`}>
        <AddButton type="submit" />
      </form>
    );
  }

  return (
    <StyledSocialAccount>
      <Logo>{logo}</Logo>
      <Text>{text}</Text>
      <SocialButton>{button}</SocialButton>
    </StyledSocialAccount>
  );
};

interface ISocialAccountProps {
  text: string;
  logo: ReactNode;
  provider: IAuthProvider;
}

const SocialButton = styled.span`
  margin-left: ${GRID.UNIT};
`;

const Logo = styled(Icon)`
  margin-right: ${GRID.UNIT};
`;

const Text = styled.span`
  flex: 1;
`;

const StyledSocialAccount = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 448px;
  padding-right: ${GRID.DOUBLE};
`;
