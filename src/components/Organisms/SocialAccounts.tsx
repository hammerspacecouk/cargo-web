import { MessageWarning } from "@src/components/Molecules/Message";
import * as React from "react";
import { GridWrapper } from "@src/components/Atoms/GridWrapper";
import styled from "styled-components";
import { Prose } from "@src/components/Atoms/Prose";
import { GRID } from "@src/styles/variables";
import { Icon } from "@src/components/Atoms/Icon";
import { ReactNode } from "react";
import { AddButton, ConfirmButton, DangerButton, RemoveButton } from "@src/components/Atoms/Button";
import {
  AmazonLogo,
  AppleLogo,
  FacebookLogo,
  GoogleLogo,
  MicrosoftLogo,
  RedditLogo,
  TwitterLogo,
} from "@src/components/Atoms/Logos";
import { IActionToken, IClassNameProps } from "@src/interfaces";
import { routes } from "@src/routes";
import { IAuthProvider } from "@src/data/profile";
import { TokenButton } from "@src/components/Molecules/TokenButton";
import { Environment } from "@src/utils/environment";
import { useState } from "react";
import { Modal, ModalType } from "@src/components/Molecules/Modal";
import { ApiClient } from "@src/utils/ApiClient";
import { ButtonRow } from "@src/components/Molecules/ButtonRow";

export const SocialAccounts = ({ isAnonymous, authProviders, className }: IProps) => {
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
      <Providers providers={authProviders} />
    </div>
  );
};

const Providers = ({ providers }: { providers: IAuthProvider[] }) => {
  const activeCount = providers.reduce((acc, provider) => {
    if (provider.removalToken) {
      acc++;
    }
    return acc;
  }, 0);

  const withWarning = activeCount === 1;

  const providerButtons = providers.map((provider: IAuthProvider) => {
    switch (provider.provider) {
      case "amazon":
        return (
          <SocialAccount
            key={provider.provider}
            withWarning={withWarning}
            logo={<AmazonLogo />}
            text="Amazon"
            provider={provider}
          />
        );
      case "apple":
        return (
          <SocialAccount
            key={provider.provider}
            withWarning={withWarning}
            logo={<AppleLogo />}
            text="Apple"
            provider={provider}
          />
        );
      case "facebook":
        return (
          <SocialAccount
            key={provider.provider}
            withWarning={withWarning}
            logo={<FacebookLogo />}
            text="Facebook"
            provider={provider}
          />
        );
      case "google":
        return (
          <SocialAccount
            key={provider.provider}
            withWarning={withWarning}
            logo={<GoogleLogo />}
            text="Google"
            provider={provider}
          />
        );
      case "microsoft":
        return (
          <SocialAccount
            key={provider.provider}
            withWarning={withWarning}
            logo={<MicrosoftLogo />}
            text="Microsoft"
            provider={provider}
          />
        );
      case "reddit":
        return (
          <SocialAccount
            key={provider.provider}
            withWarning={withWarning}
            logo={<RedditLogo />}
            text="Reddit"
            provider={provider}
          />
        );
      case "twitter":
        return (
          <SocialAccount
            key={provider.provider}
            withWarning={withWarning}
            logo={<TwitterLogo />}
            text="Twitter"
            provider={provider}
          />
        );
    }
  });

  return <GridWrapper as="ul">{providerButtons}</GridWrapper>;
};

interface IProps extends IClassNameProps {
  isAnonymous: boolean;
  authProviders: IAuthProvider[];
}

const SocialAccount = ({ logo, text, provider, withWarning }: ISocialAccountProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const removalHandler = async (token: IActionToken) => {
    // todo - update the session directly
    await ApiClient.tokenFetch(token);
    window.location.reload();
  };

  let button, modal;
  if (provider.removalToken) {
    if (withWarning) {
      modal = (
        <Modal isOpen={modalIsOpen} title="Are you sure?" onClose={closeModal} type={ModalType.DANGER}>
          <Prose>
            <p>
              You are unlinking all providers from your account so it will become fully <strong>Anonymous</strong>. In
              this state if you clear your cookies or reset your browser you will lose access to this game forever.
            </p>
            <p>Are you really sure you want to convert to an anonymous account?</p>
          </Prose>
          <ButtonRow>
            <TokenButton token={provider.removalToken} handler={removalHandler}>
              <DangerButton>Yes, unlink {text}</DangerButton>
            </TokenButton>{" "}
            <ConfirmButton onClick={closeModal}>Cancel</ConfirmButton>
          </ButtonRow>
        </Modal>
      );
      button = <RemoveButton onClick={() => setModalIsOpen(true)} />;
    } else {
      button = (
        <TokenButton token={provider.removalToken} handler={removalHandler}>
          <RemoveButton />
        </TokenButton>
      );
    }
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
      {modal}
    </StyledSocialAccount>
  );
};

interface ISocialAccountProps {
  text: string;
  logo: ReactNode;
  provider: IAuthProvider;
  withWarning: boolean;
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
