import * as React from "react";
import styled from "styled-components";
import { ILoginOptions, IMessage } from "@src/interfaces";
import { GRID } from "@src/styles/variables";
import { Environment } from "@src/utils/environment";
import { ListInline } from "@src/components/Atoms/List/ListInline";
import {
  AnonymousButton,
  FacebookButton,
  GoogleButton,
  MicrosoftButton,
  RedditButton,
  TwitterButton,
} from "@src/components/Molecules/SocialButton";
import { MessagesPanel } from "./MessagesPanel";
import { Loading } from "@src/components/Atoms/Loading";
import { TokenButton } from "@src/components/Molecules/TokenButton";
import { BREAKPOINTS } from "@src/styles/media";
import { routes } from "@src/routes";

export const LoginForm = ({ loginOptions, messages, redirect }: IProps) => {
  if (loginOptions === undefined) {
    return (
      <>
        <MessagesPanel messages={messages} />
        <Loading />
      </>
    );
  }

  return (
    <>
      <MessagesPanel messages={messages} />
      <Text>Use any of the following authentication providers to begin or continue a game:</Text>
      <List>
        {loginOptions.facebook && (
          <Item>
            <FacebookButton href={`${Environment.clientApiHostname}${loginOptions.facebook}?r=${redirect}`} />
          </Item>
        )}
        {loginOptions.google && (
          <Item>
            <GoogleButton href={`${Environment.clientApiHostname}${loginOptions.google}?r=${redirect}`} />
          </Item>
        )}
        {loginOptions.microsoft && (
          <Item>
            <MicrosoftButton href={`${Environment.clientApiHostname}${loginOptions.microsoft}?r=${redirect}`} />
          </Item>
        )}
        {loginOptions.twitter && (
          <Item>
            <TwitterButton href={`${Environment.clientApiHostname}${loginOptions.twitter}?r=${redirect}`} />
          </Item>
        )}
        {loginOptions.reddit && (
          <Item>
            <RedditButton href={`${Environment.clientApiHostname}${loginOptions.reddit}?r=${redirect}`} />
          </Item>
        )}
        {loginOptions.anon && (
          <Item>
            <AnonForm token={loginOptions.anon}>
              <AnonymousButton>New Anonymous Game</AnonymousButton>
            </AnonForm>
          </Item>
        )}
      </List>
      <Text>
        We don't get access to your account details on these services. No spam, no sharing with third parties.{" "}
        <a href={routes.getAboutPolicies()}>More about our login policies</a>. By logging in you are agreeing to the{" "}
        <a href="/about/terms">Terms & Conditions</a> of this game.
      </Text>
    </>
  );
};

interface IProps {
  readonly messages?: IMessage[];
  readonly loginOptions?: ILoginOptions;
  readonly redirect?: string;
}

const Text = styled.p`
  margin-bottom: ${GRID.DOUBLE};
`;

const List = styled(ListInline)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: ${GRID.DOUBLE};
  ${BREAKPOINTS.S`
    margin-left: -${GRID.UNIT};
  `}
`;

const Item = styled.li`
  display: block;
  width: 100%;
  margin: 0 0 ${GRID.UNIT} 0;
  ${BREAKPOINTS.S`
      width: 50%;
      display: inline-block;
      padding: 0 0 0 ${GRID.UNIT};
    `}
`;

const AnonForm = styled(TokenButton)`
  display: block;
  > * {
    width: 100%;
    padding: 12px ${GRID.UNIT};
    line-height: 1.4;
  }
`;
