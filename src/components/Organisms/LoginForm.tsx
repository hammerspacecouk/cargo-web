import * as React from "react";
import styled from "styled-components";
import { ILoginOptions, IMessage } from "../../interfaces";
import { GRID } from "../../styles/variables";
import { Environment } from "../../utils/environment";
import { ConfirmButton } from "../Atoms/Button";
import { H2 } from "../Atoms/Heading";
import { ListInline } from "../Atoms/List/ListInline";
import { P } from "../Atoms/Text";
import { FacebookButton, GoogleButton, MicrosoftButton, TwitterButton } from "../Molecules/SocialButton";
import { MessagesPanel } from "./MessagesPanel";
import { Loading } from "../Atoms/Loading";
import { TokenButton } from "../Molecules/TokenButton";
import { Prose } from "../Atoms/Prose";
import { BREAKPOINTS } from "../../styles/media";
import { routes } from "../../routes";

export const LoginForm = ({ loginOptions, messages }: IProps) => {
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
      <Prose>
        {loginOptions.anon && (
          <>
            <P>Start a new game anonymously</P>
            <AnonForm token={loginOptions.anon}>
              <ConfirmButton>New game</ConfirmButton>
            </AnonForm>

            <H2>Or:</H2>
          </>
        )}
        <P>
          Use any of the following authentication providers. We don't get access to your account details on these
          services. No spam, no sharing with third parties.{" "}
          <a href={routes.getAboutPolicies()}>More about our login policies</a>
        </P>
      </Prose>
      <List>
        {loginOptions.facebook && (
          <Item>
            <FacebookButton href={`${Environment.clientApiHostname}${loginOptions.facebook}`} />
          </Item>
        )}
        {loginOptions.google && (
          <Item>
            <GoogleButton href={`${Environment.clientApiHostname}${loginOptions.google}`} />
          </Item>
        )}
        {loginOptions.microsoft && (
          <Item>
            <MicrosoftButton href={`${Environment.clientApiHostname}${loginOptions.microsoft}`} />
          </Item>
        )}
        {loginOptions.twitter && (
          <Item>
            <TwitterButton href={`${Environment.clientApiHostname}${loginOptions.twitter}`} />
          </Item>
        )}
      </List>
    </>
  );
};

interface IProps {
  readonly messages?: IMessage[];
  readonly loginOptions?: ILoginOptions;
}

const List = styled(ListInline)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: ${GRID.UNIT};
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
  text-align: center;
  margin: ${GRID.UNIT} 0;
  display: block;
`;
