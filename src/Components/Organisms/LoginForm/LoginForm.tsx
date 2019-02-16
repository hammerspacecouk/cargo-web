import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSessionContext } from "../../../context/SessionContext";
import { IMessage } from "../../../Interfaces";
import { COLOURS } from "../../../styles/colours";
import { GRID } from "../../../styles/variables";
import { Environment } from "../../../util/Environment";
import { Button } from "../../Atoms/Button/Button";
import { H4 } from "../../Atoms/Heading/Heading";
import { ListInline } from "../../Atoms/Lists/ListInline/ListInline";
import { P } from "../../Atoms/Text/Text";
import {
  FacebookButton,
  GoogleButton,
  MicrosoftButton,
  TwitterButton,
} from "../../Molecules/SocialButton/SocialButton";
import { MessagesPanel } from "../MessagesPanel/MessagesPanel";
import { Loading } from "../../Atoms/Loading/Loading";

interface IProps {
  messages?: IMessage[];
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
          required={true}
          placeholder="name@example.com"
        />
        <Button type="submit">Send</Button>
      </StyledForm>
    </>
  );
};

export const LoginForm = (props: IProps) => {
  const { loginOptions } = useSessionContext();

  if (!loginOptions) {
    return <Loading />;
  }

  return (
    <div>
      <MessagesPanel messages={props.messages} />
      <P>
        We identify which player you are by confirming your unique e-mail
        address. Use any one of the following methods. We don't get access to
        your accounts on these services. No spam, no sharing with third parties.
      </P>
      <List>
        {loginOptions.facebook && (
          <Item>
            <FacebookButton href={loginPathFacebook} />
          </Item>
        )}
        {loginOptions.google && (
          <Item>
            <GoogleButton href={loginPathGoogle} />
          </Item>
        )}
        {loginOptions.microsoft && (
          <Item>
            <MicrosoftButton href={loginPathMicrosoft} />
          </Item>
        )}
        {loginOptions.twitter && (
          <Item>
            <TwitterButton href={loginPathTwitter} />
          </Item>
        )}
      </List>
      {loginOptions && loginOptions.email && (
        <EmailLogin token={loginOptions.email} />
      )}
      <P>
        <Link to="/about/policies">More info on our login policies</Link>
      </P>
    </div>
  );
};
