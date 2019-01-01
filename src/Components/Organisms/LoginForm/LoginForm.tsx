import * as React from "react";
import styled from "styled-components";
import { MessageInterface } from "../../../Interfaces";
import { MessagesPanel } from "../MessagesPanel/MessagesPanel";
import { Environment } from "../../../util/Environment";
import { Link } from "react-router-dom";
import { H4 } from "../../Atoms/Heading/Heading";
import {
  FacebookButton,
  GoogleButton,
  MicrosoftButton,
  TwitterButton
} from "../../Molecules/SocialButton/SocialButton";
import { GRID } from "../../../styles/variables";
import { ListInline } from "../../Atoms/Lists/ListInline/ListInline";
import { Button } from "../../Atoms/Button/Button";
import { P } from "../../Atoms/Text/Text";
import { COLOURS } from "../../../styles/colours";
import { useSessionContext } from "../../../context/SessionContext";

interface PropsInterface {
  messages?: MessageInterface[];
}

const loginPathEmail = `${Environment.apiHostname}/login/email`;
const loginPathFacebook = `${Environment.apiHostname}/login/facebook`;
const loginPathGoogle = `${Environment.apiHostname}/login/google`;
const loginPathMicrosoft = `${Environment.apiHostname}/login/microsoft`;
const loginPathTwitter = `${Environment.apiHostname}/login/twitter`;

const List = styled(ListInline)`
  display: flex;
  justify-content: center;
  margin: ${GRID.UNIT} 0 0;
  flex-wrap: wrap;
`;

const Item = styled.li`
  margin: 0 ${GRID.UNIT} ${GRID.UNIT} 0;
`;

const StyledForm = styled.form`
  display: flex;
  margin: ${GRID.UNIT} 0;
`;

const StyledInput = styled.input`
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

const EmailTitle = styled(H4)`
  margin-bottom: ${GRID.UNIT};
`;

const EmailLogin = ({ token }: { token: string }) => {
  return (
    <>
      <EmailTitle as="h3">
        <label htmlFor="login-email">Log in via e-mail</label>
      </EmailTitle>
      <P>
        If you'd rather use your e-mail directly enter your e-mail address and
        we'll send you a link that lets you log in immediately. The link is
        valid for one hour and there are no passwords required.
      </P>
      <StyledForm action={loginPathEmail} method="post">
        <input type="hidden" name="loginToken" value={token} />
        <StyledInput
          id="login-email"
          type="email"
          name="target"
          required
          placeholder="name@example.com"
        />
        <Button type="submit">Send</Button>
      </StyledForm>
    </>
  );
};

export const LoginForm = (props: PropsInterface) => {
  const { loginToken } = useSessionContext();

  return (
    <div>
      <MessagesPanel messages={props.messages} />
      <P>
        We identify which player you are by confirming your unique e-mail
        address. Use any one of the following methods. We don't get access to
        your accounts on these services. No spam, no sharing with third parties.
      </P>
      <List>
        <Item>
          <FacebookButton href={loginPathFacebook} />
        </Item>
        <Item>
          <GoogleButton href={loginPathGoogle} />
        </Item>
        <Item>
          <MicrosoftButton href={loginPathMicrosoft} />
        </Item>
        <Item>
          <TwitterButton href={loginPathTwitter} />
        </Item>
      </List>
      {loginToken && <EmailLogin token={loginToken} />}
      <P>
        <Link to="/about/policies">More info on our login policies</Link>
      </P>
    </div>
  );
};
