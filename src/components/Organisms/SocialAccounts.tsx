import { MessageWarning } from "../Molecules/Message";
import * as React from "react";
import { useGameSessionContext } from "../../contexts/GameSessionContext/GameSessionContext";
import { GridWrapper } from "../Atoms/GridWrapper";
import styled from "styled-components";
import { Prose } from "../Atoms/Prose";
import { GRID } from "../../styles/variables";
import { Icon } from "../Atoms/Icon";
import { ReactNode } from "react";
import { AddButton, RemoveButton } from "../Atoms/Button";
import { AppleLogo, FacebookLogo, GoogleLogo, MicrosoftLogo, RedditLogo, TwitterLogo } from "../Atoms/Logos";
import { IChildrenProps } from "../../interfaces";
import { routes } from "../../routes";

export const SocialAccounts = ({ className }: { className?: string }) => {
  const {} = useGameSessionContext();

  // todo - prompt if you go to remove the last one
  let warning;
  if (true) {
    // todo - reals
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
          We recognise your account through the association with one of these accounts. We don't store or access your
          personal data on these platforms. <a href={routes.getAboutPolicies()}>Read more about your privacy</a>.
        </p>
      </Prose>
      <GridWrapper as="ul">
        <SocialAccount logo={<AppleLogo />} text="Apple">
          <RemoveButton />
        </SocialAccount>
        <SocialAccount logo={<FacebookLogo />} text="Facebook">
          <RemoveButton />
        </SocialAccount>
        <SocialAccount logo={<GoogleLogo />} text="Google">
          <AddButton />
        </SocialAccount>
        <SocialAccount logo={<MicrosoftLogo />} text="Microsoft">
          <AddButton />
        </SocialAccount>
        <SocialAccount logo={<RedditLogo />} text="Reddit">
          <AddButton />
        </SocialAccount>
        <SocialAccount logo={<TwitterLogo />} text="Twitter">
          <RemoveButton />
        </SocialAccount>
      </GridWrapper>
    </div>
  );
};

const SocialAccount = ({ logo, text, children }: ISocialAccountProps) => (
  <StyledSocialAccount>
    <Logo>{logo}</Logo>
    <Text>{text}</Text>
    <SocialButton>{children}</SocialButton>
  </StyledSocialAccount>
);

interface ISocialAccountProps extends IChildrenProps {
  text: string;
  logo: ReactNode;
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
