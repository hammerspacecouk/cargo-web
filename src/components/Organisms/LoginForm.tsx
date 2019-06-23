import * as React from "react";
import styled from "styled-components";
import { IActionToken, ILoginOptions, IMessage } from "../../interfaces";
import { COLOURS } from "../../styles/colours";
import { GRID } from "../../styles/variables";
import { Environment } from "../../utils/environment";
import { Button, ConfirmButton } from "../Atoms/Button";
import { H2, H3 } from "../Atoms/Heading";
import { ListInline } from "../Atoms/List/ListInline";
import { P } from "../Atoms/Text";
import {
  FacebookButton,
  GoogleButton,
  MicrosoftButton,
  TwitterButton,
} from "../Molecules/SocialButton";
import { MessagesPanel } from "./MessagesPanel";
import { Loading } from "../Atoms/Loading";
import { TokenButton } from "../Molecules/TokenButton";
import { Prose } from "../Atoms/Prose";
import { BREAKPOINTS } from "../../styles/media";
import { MONOSPACE_FONT } from "../../styles/typography";

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
          We identify which player you are by confirming your unique email address. Use any one of the following
          methods. We don't get access to your accounts on these services. No spam, no sharing with third parties. And
          we don't store the email address in a way that can be recovered.
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
      <Prose>
        {loginOptions.email && <EmailLogin token={loginOptions.email} />}
        <P>
          <a href="/about/policies">More info on our login policies</a>
        </P>
      </Prose>
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

const StyledForm = styled.div`
  display: flex;
  margin: ${GRID.UNIT} 0;
`;

const StyledInput = styled.input`
  ${MONOSPACE_FONT};
  flex: 1;
  outline: none;
  margin-right: ${GRID.UNIT};
  background: none;
  border: none;
  border-bottom: solid 2px ${COLOURS.BODY.TEXT};
  padding-left: ${GRID.HALF};
  &:focus {
    border-bottom-color: ${COLOURS.BODY.LINK};
  }
`;

const AnonForm = styled(TokenButton)`
  text-align: center;
  margin: ${GRID.UNIT} 0;
  display: block;
`;

const EmailLogin = ({ token }: { token: IActionToken }) => {
  return (
    <>
      <H3>
        <label htmlFor="login-email">Log in via email</label>
      </H3>
      <P>
        If you'd rather use your email directly enter your email address and we'll send you a link that lets you log in
        immediately. The link is valid for one hour and there are no passwords required. We don't store it.
      </P>
      <TokenButton token={token}>
        <StyledForm>
          <StyledInput id="login-email" type="email" name="target" required={true} placeholder="name@example.com" />
          <Button type="submit">Send</Button>
        </StyledForm>
      </TokenButton>
    </>
  );
};
