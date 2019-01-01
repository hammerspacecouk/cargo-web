import * as React from "react";
import { LoginForm } from "../components/Organisms/LoginForm/LoginForm";
import { messageQueryString } from "../util/MessageQueryString";
import { SimplePage } from "../components/Templates/SimplePage/SimplePage";

interface PropsInterface {
  query?: string;
}

export const LoginPage = ({ query }: PropsInterface) => {
  return (
    <SimplePage title="Login">
      <LoginForm messages={messageQueryString(query)}/>
    </SimplePage>
  );
};
